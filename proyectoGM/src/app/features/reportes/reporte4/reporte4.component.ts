
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Producto } from '../../../core/models/producto';
import { ProductoService } from '../../../core/services/producto.service';

@Component({
    selector: 'app-reporte4',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './reporte4.component.html',
    styleUrls: ['./reporte4.component.scss']
})
export class Reporte4Component implements OnInit {

    productos: Producto[] = [];
    busqueda = '';
    marcaSeleccionada = '';

    constructor(private productoService: ProductoService) { }

    ngOnInit(): void {
        this.productoService.listar().subscribe(productos => {
            this.productos = productos;
        });
    }

    get totalProductos(): number {
        return this.productos.length;
    }

    get totalMarcas(): number {
        return new Set(this.productos.map(p => p.marca)).size;
    }

    get precioPromedio(): number {
        if (!this.productos.length) return 0;

        return this.productos.reduce(
            (total, p) => total + p.precio, 0
        ) / this.productos.length;
    }

    get marcas(): string[] {
        return [...new Set(this.productos.map(p => p.marca))].sort();
    }

    get productosFiltrados(): Producto[] {
        const texto = this.busqueda.toLowerCase().trim();

        return this.productos.filter(p => {
            const coincideTexto =
                p.nombre.toLowerCase().includes(texto) ||
                p.marca.toLowerCase().includes(texto);

            const coincideMarca =
                !this.marcaSeleccionada ||
                p.marca === this.marcaSeleccionada;

            return coincideTexto && coincideMarca;
        });
    }

    imprimir(): void {
        window.print();
    }

    limpiarFiltros(): void {
        this.busqueda = '';
        this.marcaSeleccionada = '';
    }
}
