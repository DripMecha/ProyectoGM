import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, timeout } from 'rxjs';
import { DatosReporte, OrigenReporte, Reporte } from '../models/reporte.model';

const soles = (n: number) => 'S/ ' + n.toLocaleString('es-PE');
const total = (d: DatosReporte) => d.valores.reduce((a, b) => a + b, 0);
const mayor = (d: DatosReporte) => {
  const i = d.valores.indexOf(Math.max(...d.valores));
  return { etiqueta: d.etiquetas[i], valor: d.valores[i] };
};

// Lee los reportes del backend (GET /api/reportes/...). Si el backend no responde,
// usa datos de ejemplo para que el panel siga funcionando en la demostración.
// Para agregar un reporte nuevo: crea un método igual a los de abajo.
@Injectable({ providedIn: 'root' })
export class ReportesService {
  private http = inject(HttpClient);

  private obtener(
    ruta: string,
    titulo: string,
    ejemplo: DatosReporte,
    describir: (d: DatosReporte) => string
  ): Observable<Reporte> {
    const armar = (d: DatosReporte, origen: OrigenReporte): Reporte => ({
      titulo, etiquetas: d.etiquetas, valores: d.valores, descripcion: describir(d), origen,
    });
    return this.http.get<DatosReporte>(`/api/reportes/${ruta}`).pipe(
      timeout(4000),
      map(d => (d && d.etiquetas?.length ? armar(d, 'bd') : armar(ejemplo, 'ejemplo'))),
      catchError(() => of(armar(ejemplo, 'ejemplo')))
    );
  }

  // Reporte 1 · Ventas por mes (gráfico de líneas)
  ventasPorMes(): Observable<Reporte> {
    return this.obtener('ventas-por-mes', 'Ventas por mes',
      { etiquetas: ['Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov'], valores: [8200, 9400, 7800, 11250, 12400, 13800] },
      d => `El mes con más ventas fue ${mayor(d).etiqueta}, con ${soles(mayor(d).valor)}. En total se vendieron ${soles(total(d))} en el periodo.`);
  }

  // Reporte 2 · Productos más vendidos (gráfico de barras)
  productosMasVendidos(): Observable<Reporte> {
    return this.obtener('productos-mas-vendidos', 'Productos más vendidos',
      { etiquetas: ['Filtro de aceite', 'Pastillas de freno', 'Amortiguador', 'Filtro de aire', 'Bujías', 'Faros'], valores: [120, 98, 76, 64, 52, 41] },
      d => `El producto más vendido fue ${mayor(d).etiqueta}, con ${mayor(d).valor} unidades. Entre los ${d.etiquetas.length} productos del reporte se vendieron ${total(d)} unidades.`);
  }

  // Reporte 3 · Ventas por categoría (gráfico de pastel)
  ventasPorCategoria(): Observable<Reporte> {
    return this.obtener('ventas-por-categoria', 'Ventas por categoría',
      { etiquetas: ['Motor', 'Suspensión', 'Frenos', 'Filtros', 'Eléctrico'], valores: [7400, 6100, 5200, 4300, 2800] },
      d => `La categoría con más ventas fue ${mayor(d).etiqueta}, con ${soles(mayor(d).valor)} (${Math.round((mayor(d).valor / total(d)) * 100)}% del total).`);
  }
}
