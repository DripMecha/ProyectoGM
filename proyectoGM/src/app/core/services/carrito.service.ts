
import { Injectable, computed, signal } from '@angular/core';
import { Producto } from '../models/producto';

export interface ItemCarrito {
    producto: Producto;
    cantidad: number;
}

@Injectable({
    providedIn: 'root'
})
export class CarritoService {

    private readonly STORAGE_KEY = 'genuine_motors_carrito';

    private cargar(): ItemCarrito[] {
        try {
            const datos = localStorage.getItem(this.STORAGE_KEY);
            return datos ? JSON.parse(datos) as ItemCarrito[] : [];
        } catch {
            return [];
        }
    }

    private items = signal<ItemCarrito[]>(this.cargar());

    readonly carrito = this.items.asReadonly();

    readonly cantidadTotal = computed(() =>
        this.items().reduce((total, item) => total + item.cantidad, 0)
    );

    readonly subtotal = computed(() =>
        this.items().reduce(
            (total, item) => total + item.producto.precio * item.cantidad,
            0
        )
    );

    // Los precios del catálogo ya incluyen IGV.
    readonly total = computed(() => this.subtotal());

    // IGV incluido en el precio (desglose referencial).
    readonly igv = computed(() => this.subtotal() * 18 / 118);

    private guardar(): void {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.items()));
    }

    agregar(producto: Producto): void {
        this.items.update(items => {
            const existente = items.find(
                item => item.producto.id === producto.id
            );

            if (existente) {
                return items.map(item =>
                    item.producto.id === producto.id
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                );
            }

            return [...items, { producto: { ...producto }, cantidad: 1 }];
        });

        this.guardar();
    }

    aumentar(id: number): void {
        this.items.update(items =>
            items.map(item =>
                item.producto.id === id
                    ? { ...item, cantidad: item.cantidad + 1 }
                    : item
            )
        );
        this.guardar();
    }

    disminuir(id: number): void {
        this.items.update(items =>
            items
                .map(item =>
                    item.producto.id === id
                        ? { ...item, cantidad: item.cantidad - 1 }
                        : item
                )
                .filter(item => item.cantidad > 0)
        );
        this.guardar();
    }

    eliminar(id: number): void {
        this.items.update(items =>
            items.filter(item => item.producto.id !== id)
        );
        this.guardar();
    }

    vaciar(): void {
        this.items.set([]);
        this.guardar();
    }
}
