import { Component } from '@angular/core';
import { Navbar } from '../../../shared/navbar/navbar';
import { Banner } from '../../../shared/banner/banner';
import { Footer } from '../../../shared/footer/footer';
import { ReporteVentasMesComponent } from './reporte-ventas-mes';
import { ReporteProductosVendidosComponent } from './reporte-productos-vendidos';
import { ReporteVentasCategoriaComponent } from './reporte-ventas-categoria';

// Panel de reportes del administrador (ruta /admin/reportes).
// Reportes 4, 5 y 6: cada responsable crea su componente (ver los de este mismo
// folder), lo agrega en "imports" y reemplaza su recuadro en reportes.html.
@Component({
  selector: 'app-reportes',
  imports: [Navbar, Banner, Footer, ReporteVentasMesComponent, ReporteProductosVendidosComponent, ReporteVentasCategoriaComponent],
  templateUrl: './reportes.html',
  styleUrl: './reportes.scss',
})
export class ReportesComponent {}
