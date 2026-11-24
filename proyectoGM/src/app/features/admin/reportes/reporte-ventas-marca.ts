import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ReporteCard } from '../../../shared/reporte-card/reporte-card';
import { ReportesService } from '../../../core/services/reportes.service';

// Reporte 6 · Ventas por marca: Hyundai y Kia (Abel)
@Component({
  selector: 'app-reporte-ventas-marca',
  imports: [ReporteCard],
  template: `
    @if (reporte(); as r) {
      <app-reporte-card [reporte]="r" tipo="bar" />
    } @else {
      <p>Cargando reporte...</p>
    }
  `,
})
export class ReporteVentasMarcaComponent {
  private servicio = inject(ReportesService);
  reporte = toSignal(this.servicio.ventasPorMarca());
}
