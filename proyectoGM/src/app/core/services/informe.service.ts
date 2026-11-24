import { Injectable } from '@angular/core';
import { Reporte } from '../models/reporte.model';

// Descarga de informes de los reportes del administrador (Abel · feature/ofertas).
// Cada informe lleva: título, fecha, tabla de datos, descripción del resultado y,
// en PDF y Word, la imagen del gráfico.
// Las librerías se cargan solo al hacer clic, para no hacer más lenta la página.
@Injectable({ providedIn: 'root' })
export class InformeService {
  // ---------- EXCEL (librería xlsx) ----------
  async descargarExcel(r: Reporte): Promise<void> {
    const XLSX = await import('xlsx');
    const filas: (string | number)[][] = [
      ['Genuine Motors Parts'],
      [r.titulo],
      ['Fecha', this.fecha()],
      [],
      ['Dato', 'Valor', 'Porcentaje'],
      ...this.tabla(r).map((f) => [f.etiqueta, f.valor, f.porcentaje]),
      ['Total', this.total(r), '100%'],
      [],
      ['Resultado', r.descripcion],
    ];
    const hoja = XLSX.utils.aoa_to_sheet(filas);
    hoja['!cols'] = [{ wch: 32 }, { wch: 14 }, { wch: 12 }];
    const libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hoja, 'Reporte');
    XLSX.writeFile(libro, this.nombre(r, 'xlsx'));
  }

  // ---------- PDF (librerías jspdf y jspdf-autotable) ----------
  async descargarPdf(r: Reporte, imagen?: string): Promise<void> {
    const { jsPDF } = await import('jspdf');
    const { default: autoTable } = await import('jspdf-autotable');
    const doc = new jsPDF();
    const ancho = doc.internal.pageSize.getWidth();

    doc.setFillColor(11, 42, 91);
    doc.rect(0, 0, ancho, 26, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.text('Genuine Motors Parts', 14, 12);
    doc.setFontSize(11);
    doc.text('Informe de reporte', 14, 20);

    doc.setTextColor(11, 42, 91);
    doc.setFontSize(15);
    doc.text(r.titulo, 14, 38);
    doc.setFontSize(10);
    doc.setTextColor(90, 100, 120);
    doc.text(`Fecha: ${this.fecha()}`, 14, 45);

    let y = 52;
    if (imagen) {
      const alto = 85;
      doc.addImage(imagen, 'PNG', 14, y, ancho - 28, alto);
      y += alto + 6;
    }

    autoTable(doc, {
      startY: y,
      head: [['Dato', 'Valor', 'Porcentaje']],
      body: this.tabla(r).map((f) => [f.etiqueta, String(f.valor), f.porcentaje]),
      foot: [['Total', String(this.total(r)), '100%']],
      headStyles: { fillColor: [11, 42, 91] },
      footStyles: { fillColor: [216, 35, 42] },
    });

    const finTabla = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY;
    doc.setFontSize(12);
    doc.setTextColor(11, 42, 91);
    doc.text('Resultado', 14, finTabla + 10);
    doc.setFontSize(10);
    doc.setTextColor(40, 40, 40);
    doc.text(doc.splitTextToSize(r.descripcion, ancho - 28), 14, finTabla + 17);

    doc.save(this.nombre(r, 'pdf'));
  }

  // ---------- WORD (librería docx) ----------
  async descargarWord(r: Reporte, imagen?: string): Promise<void> {
    const d = await import('docx');
    const celda = (texto: string, negrita = false) =>
      new d.TableCell({
        width: { size: 33, type: d.WidthType.PERCENTAGE },
        children: [new d.Paragraph({ children: [new d.TextRun({ text: texto, bold: negrita })] })],
      });
    const fila = (a: string, b: string, c: string, negrita = false) =>
      new d.TableRow({ children: [celda(a, negrita), celda(b, negrita), celda(c, negrita)] });

    const contenido = [
      new d.Paragraph({ text: 'Genuine Motors Parts', heading: d.HeadingLevel.HEADING_2 }),
      new d.Paragraph({ text: r.titulo, heading: d.HeadingLevel.HEADING_1 }),
      new d.Paragraph({ children: [new d.TextRun({ text: `Fecha: ${this.fecha()}`, italics: true })] }),
      new d.Paragraph({ text: '' }),
    ];

    if (imagen) {
      contenido.push(
        new d.Paragraph({
          children: [
            new d.ImageRun({
              type: 'png',
              data: this.base64ABytes(imagen),
              transformation: { width: 560, height: 300 },
            }),
          ],
        }),
      );
    }

    const tabla = new d.Table({
      width: { size: 100, type: d.WidthType.PERCENTAGE },
      rows: [
        fila('Dato', 'Valor', 'Porcentaje', true),
        ...this.tabla(r).map((f) => fila(f.etiqueta, String(f.valor), f.porcentaje)),
        fila('Total', String(this.total(r)), '100%', true),
      ],
    });

    const documento = new d.Document({
      sections: [
        {
          children: [
            ...contenido,
            tabla,
            new d.Paragraph({ text: '' }),
            new d.Paragraph({ text: 'Resultado', heading: d.HeadingLevel.HEADING_3 }),
            new d.Paragraph({ text: r.descripcion }),
          ],
        },
      ],
    });

    this.guardar(await d.Packer.toBlob(documento), this.nombre(r, 'docx'));
  }

  // ---------- Ayudas ----------
  private tabla(r: Reporte) {
    const total = this.total(r) || 1;
    return r.etiquetas.map((etiqueta, i) => ({
      etiqueta,
      valor: r.valores[i],
      porcentaje: `${((r.valores[i] / total) * 100).toFixed(1)}%`,
    }));
  }

  private total(r: Reporte): number {
    return r.valores.reduce((a, b) => a + b, 0);
  }

  private fecha(): string {
    return new Date().toLocaleDateString('es-PE', { day: '2-digit', month: 'long', year: 'numeric' });
  }

  private nombre(r: Reporte, extension: string): string {
    const base = r.titulo
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-zA-Z0-9]+/g, '_');
    return `Reporte_${base}_${new Date().toISOString().slice(0, 10)}.${extension}`;
  }

  private base64ABytes(dataUrl: string): Uint8Array {
    const binario = atob(dataUrl.split(',')[1]);
    const bytes = new Uint8Array(binario.length);
    for (let i = 0; i < binario.length; i++) bytes[i] = binario.charCodeAt(i);
    return bytes;
  }

  private guardar(blob: Blob, nombre: string): void {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = nombre;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
}
