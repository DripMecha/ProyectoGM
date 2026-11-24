import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ReporteCard } from '../../../shared/reporte-card/reporte-card';
import { ReportesService } from '../../../core/services/reportes.service';

// Reporte 5 · Pedidos por estado (Abel)
@Component({
  selector: 'app-reporte-pedidos-estado',
  imports: [ReporteCard],
  template: `
    @if (reporte(); as r) {
      <app-reporte-card [reporte]="r" tipo="doughnut" />
    } @else {
      <p>Cargando reporte...</p>
    }
  `,
})
export class ReportePedidosEstadoComponent {
  private servicio = inject(ReportesService);
  reporte = toSignal(this.servicio.pedidosPorEstado());
}
