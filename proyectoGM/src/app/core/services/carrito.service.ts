import { Injectable, computed, signal } from '@angular/core';

// Producto dentro del carrito.
export interface ItemCarrito {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  cantidad: number;
}

const CLAVE = 'gm-carrito';

// Carrito de compras compartido (lo usan Ofertas, Catálogo y la página /carrito).
// Responsable: Ariana (feature/carrito). Esta versión base la dejó Abel para
// conectar Ofertas; se puede ampliar manteniendo los nombres de los métodos.
@Injectable({ providedIn: 'root' })
export class CarritoService {
  private _items = signal<ItemCarrito[]>(this.leer());

  items = this._items.asReadonly();
  cantidadTotal = computed(() => this._items().reduce((s, i) => s + i.cantidad, 0));
  total = computed(() => this._items().reduce((s, i) => s + i.precio * i.cantidad, 0));

  agregar(producto: Omit<ItemCarrito, 'cantidad'>, cantidad = 1): void {
    const existe = this._items().some((i) => i.id === producto.id);
    this.guardar(
      existe
        ? this._items().map((i) => (i.id === producto.id ? { ...i, cantidad: i.cantidad + cantidad } : i))
        : [...this._items(), { ...producto, cantidad }],
    );
  }

  quitar(id: number): void {
    this.guardar(this._items().filter((i) => i.id !== id));
  }

  cambiarCantidad(id: number, cantidad: number): void {
    if (cantidad <= 0) return this.quitar(id);
    this.guardar(this._items().map((i) => (i.id === id ? { ...i, cantidad } : i)));
  }

  vaciar(): void {
    this.guardar([]);
  }

  private guardar(items: ItemCarrito[]): void {
    this._items.set(items);
    try {
      localStorage.setItem(CLAVE, JSON.stringify(items));
    } catch {
      // Sin localStorage (modo privado): el carrito sigue funcionando en memoria.
    }
  }

  private leer(): ItemCarrito[] {
    try {
      return JSON.parse(localStorage.getItem(CLAVE) ?? '[]');
    } catch {
      return [];
    }
  }
}
