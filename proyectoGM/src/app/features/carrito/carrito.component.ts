
import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CarritoService } from '../../core/services/carrito.service';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';

@Component({
    selector: 'app-carrito',
    standalone: true,
    imports: [CurrencyPipe, RouterLink, Header, Footer],
    templateUrl: './carrito.component.html',
    styleUrl: './carrito.component.scss'
})
export class CarritoComponent {

    carritoService = inject(CarritoService);

    aumentar(id: number): void {
        this.carritoService.aumentar(id);
    }

    disminuir(id: number): void {
        this.carritoService.disminuir(id);
    }

    eliminar(id: number): void {
        this.carritoService.eliminar(id);
    }

    vaciar(): void {
        this.carritoService.vaciar();
    }
}
