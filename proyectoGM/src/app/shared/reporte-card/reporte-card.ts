import { AfterViewInit, Component, ElementRef, OnDestroy, input, viewChild } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { Reporte } from '../../core/models/reporte.model';

Chart.register(...registerables);

export type TipoGrafico = 'line' | 'bar' | 'barH' | 'pie' | 'doughnut';

// Tarjeta de un reporte: título, gráfico y descripción del resultado.
// Uso:  <app-reporte-card [reporte]="r" tipo="line" />
@Component({
  selector: 'app-reporte-card',
  templateUrl: './reporte-card.html',
  styleUrl: './reporte-card.scss',
})
export class ReporteCard implements AfterViewInit, OnDestroy {
  reporte = input.required<Reporte>();
  tipo = input<TipoGrafico>('bar');

  private lienzo = viewChild.required<ElementRef<HTMLCanvasElement>>('lienzo');
  private grafico?: Chart;

  ngAfterViewInit(): void {
    this.grafico = new Chart(this.lienzo().nativeElement, this.configuracion());
  }

  ngOnDestroy(): void {
    this.grafico?.destroy();
  }

  // Imagen del gráfico, útil para el informe descargable (PDF o Word).
  imagen(): string {
    return this.lienzo().nativeElement.toDataURL('image/png');
  }

  private configuracion(): ChartConfiguration {
    const r = this.reporte();
    const t = this.tipo();
    const circular = t === 'pie' || t === 'doughnut';
    const colores = ['#0b2a5b', '#d8232a', '#2e5597', '#f5a623', '#22d3dd', '#6b7a99', '#1c6b3a', '#8e44ad'];
    return {
      type: t === 'barH' ? 'bar' : t,
      data: {
        labels: r.etiquetas,
        datasets: [{
          label: r.titulo,
          data: r.valores,
          backgroundColor: circular ? colores : t === 'line' ? 'rgba(11, 42, 91, 0.15)' : '#0b2a5b',
          borderColor: '#0b2a5b',
          borderWidth: t === 'line' ? 3 : 0,
          fill: t === 'line',
          tension: 0.3,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: t === 'barH' ? 'y' : 'x',
        plugins: { legend: { display: circular } },
      },
    } as ChartConfiguration;
  }
}
