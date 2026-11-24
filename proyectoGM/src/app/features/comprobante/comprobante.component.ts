
import { Component, computed, inject, signal } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { CarritoService } from '../../core/services/carrito.service';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';

type TipoDocumento = 'DNI' | 'RUC';

interface DatosCliente {
    tipoDocumento: TipoDocumento;
    numeroDocumento: string;
    nombres: string;
    correo: string;
    telefono: string;
    direccion: string;
}

interface Comprobante {
    numero: string;
    fecha: Date;
    cliente: DatosCliente;
    productos: {
        nombre: string;
        marca: string;
        precio: number;
        cantidad: number;
        importe: number;
    }[];
    subtotalSinIGV: number;
    igvIncluido: number;
    total: number;
}

@Component({
    selector: 'app-comprobante',
    standalone: true,
    imports: [FormsModule, CurrencyPipe, DatePipe, RouterLink, Header, Footer],
    templateUrl: './comprobante.component.html',
    styleUrl: './comprobante.component.scss'
})
export class ComprobanteComponent {

    carritoService = inject(CarritoService);

    tipoDocumento: TipoDocumento = 'DNI';

    cliente: DatosCliente = {
        tipoDocumento: 'DNI',
        numeroDocumento: '',
        nombres: '',
        correo: '',
        telefono: '',
        direccion: ''
    };

    comprobante = signal<Comprobante | null>(null);

    hayProductos = computed(
        () => this.carritoService.carrito().length > 0
    );

    cambiarTipoDocumento(): void {
        this.cliente.numeroDocumento = '';
    }

    generarComprobante(): void {
        const items = this.carritoService.carrito();

        if (items.length === 0) {
            alert('No tienes productos en el carrito.');
            return;
        }

        const numero = `GM-${Date.now().toString().slice(-8)}`;

        const productos = items.map(item => ({
            nombre: item.producto.nombre,
            marca: item.producto.marca,
            precio: item.producto.precio,
            cantidad: item.cantidad,
            importe: item.producto.precio * item.cantidad
        }));

        const total = productos.reduce(
            (suma, producto) => suma + producto.importe,
            0
        );

        const igvIncluido = total * 18 / 118;
        const subtotalSinIGV = total - igvIncluido;

        const nuevoComprobante: Comprobante = {
            numero,
            fecha: new Date(),
            cliente: { ...this.cliente },
            productos,
            subtotalSinIGV,
            igvIncluido,
            total
        };

        this.comprobante.set(nuevoComprobante);

        localStorage.setItem(
            'genuine_motors_ultimo_comprobante',
            JSON.stringify(nuevoComprobante)
        );
    }

    imprimir(): void {
        window.print();
    }
}
