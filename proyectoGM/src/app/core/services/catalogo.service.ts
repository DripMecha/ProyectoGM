import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, switchMap, timeout } from 'rxjs';
import { Producto } from '../models/producto';
import { ProductoService } from './producto.service';

// Lo que devuelve el backend en GET /api/productos (entidad Producto.java).
// "marca" e "imagen" todavía no las envía la API: se leen si algún día llegan.
interface ProductoApi {
    idProducto: number;
    idMarca: number;
    nombre: string;
    descripcion: string | null;
    precioVenta: number;
    activo: boolean;
    marca?: string | { nombre: string };
    imagen?: string | null;
}

// Tabla "marca" de la BD (id_marca -> nombre), mientras la API no envíe el nombre.
const MARCAS: Record<number, string> = { 1: 'Hyundai', 2: 'Kia' };

export type Origen = 'bd' | 'ejemplo';

export interface ResultadoCatalogo {
    productos: Producto[];
    origen: Origen;
}

// Catálogo público: lee los productos de la BD a través del backend.
// Si el backend no responde (o aún no tiene productos), usa los datos de ejemplo
// para que la página siga funcionando en la demostración.
@Injectable({ providedIn: 'root' })
export class CatalogoService {
    private http = inject(HttpClient);
    private ejemplo = inject(ProductoService);
    private url = '/api/productos';

    listar(): Observable<ResultadoCatalogo> {
        return this.http.get<ProductoApi[]>(this.url).pipe(
            timeout(5000),
            map(lista => lista.filter(p => p.activo !== false).map(p => this.convertir(p))),
            switchMap(lista =>
                lista.length > 0 ? of<ResultadoCatalogo>({ productos: lista, origen: 'bd' }) : this.deEjemplo()
            ),
            catchError(() => this.deEjemplo())
        );
    }

    private deEjemplo(): Observable<ResultadoCatalogo> {
        return this.ejemplo.listar().pipe(map(productos => ({ productos, origen: 'ejemplo' as Origen })));
    }

    private convertir(p: ProductoApi): Producto {
        const marca = typeof p.marca === 'string' ? p.marca : p.marca?.nombre;
        return {
            id: p.idProducto,
            nombre: p.nombre,
            descripcion: p.descripcion ?? '',
            marca: marca ?? MARCAS[p.idMarca] ?? 'Otra',
            fechaVencimiento: null,
            precio: Number(p.precioVenta),
            imagen: p.imagen ?? '',
        };
    }
}
