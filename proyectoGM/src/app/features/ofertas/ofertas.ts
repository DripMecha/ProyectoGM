import { Component, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { Navbar } from '../../shared/navbar/navbar';
import { Banner } from '../../shared/banner/banner';
import { Footer } from '../../shared/footer/footer';
import { OfertasService, DESCUENTO_MINIMO } from '../../core/services/ofertas.service';
import { CarritoService } from '../../core/services/carrito.service';
import { Oferta } from '../../core/models/oferta';

// Responsable: Abel Mucha (rama feature/ofertas)
@Component({
  selector: 'app-ofertas',
  imports: [Navbar, Banner, Footer, CurrencyPipe],
  templateUrl: './ofertas.html',
  styleUrl: './ofertas.scss',
})
export class OfertasComponent {
  private ofertasService = inject(OfertasService);
  carrito = inject(CarritoService);

  resultado = toSignal(this.ofertasService.listar());
  minimo = DESCUENTO_MINIMO;

  // Id del último producto agregado, para mostrar "¡Agregado!" un momento.
  agregado = signal<number | null>(null);
  private aviso?: ReturnType<typeof setTimeout>;

  agregar(o: Oferta): void {
    this.carrito.agregar({ id: o.id, nombre: o.nombre, precio: o.precioOferta, imagen: o.imagen });
    this.agregado.set(o.id);
    clearTimeout(this.aviso);
    this.aviso = setTimeout(() => this.agregado.set(null), 1500);
  }

  ahorro(o: Oferta): number {
    return o.precioLista - o.precioOferta;
  }
}
