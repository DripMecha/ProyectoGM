import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ReporteCard } from '../../../shared/reporte-card/reporte-card';
import { ReportesService } from '../../../core/services/reportes.service';

@Component({
  selector: 'app-reporte-ventas-mes',
  imports: [ReporteCard],
  template: `
    @if (reporte(); as r) {
      <app-reporte-card [reporte]="r" tipo="line" />
    } @else {
      <p>Cargando reporte...</p>
    }
  `,
})
export class ReporteVentasMesComponent {
  private servicio = inject(ReportesService);
  reporte = toSignal(this.servicio.ventasPorMes());
}
