import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, timeout } from 'rxjs';
import { Oferta, ResultadoOfertas } from '../models/oferta';

// Descuento mínimo que pide el curso.
export const DESCUENTO_MINIMO = 5;

// Lo que se espera de GET /api/ofertas (backend de Cristhian). Se aceptan
// nombres alternativos por si la API final los cambia.
interface OfertaApi {
  idProducto?: number;
  id?: number;
  nombre: string;
  marca?: string | { nombre: string };
  imagen?: string | null;
  precioLista?: number;
  precioVenta?: number;
  precioOferta?: number;
  descuento?: number;
  porcentajeDescuento?: number;
}

// Datos de ejemplo: [nombre, marca, precio de lista, % de descuento, imagen]
type Semilla = [string, string, number, number, string];
const EJEMPLO: Semilla[] = [
  ['Kit de embrague Elantra', 'Hyundai', 720, 15, '/image/KitEmbragueElantra.jpg'],
  ['Amortiguador delantero Seltos', 'Kia', 290, 10, '/image/AmortiguadorDelanteroSeltos.jpg'],
  ['Bobina de encendido', 'Hyundai', 120, 12, '/image/BobinaEncendido-hyundai120.jpg'],
  ['Aceite de motor 5W-30 4 L', 'Mobis', 150, 8, '/image/AceiteMobis5w304L.jpg'],
  ['Pastillas de freno delanteras Accent', 'Hyundai', 120, 20, '/image/PastillasFrenoAccent.jpg'],
  ['Radiador Sorento', 'Kia', 540, 7, '/image/RadiadorSorento.jpg'],
  ['Batería 12V 55Ah', 'Mobis', 380, 5, '/image/Bateria12v55AH.jpg'],
  ['Filtro de aire Rio', 'Kia', 35, 10, '/image/FiltroAireRio.jpg'],
];

const redondear = (n: number) => Math.round(n * 100) / 100;

// Ofertas: lee GET /api/ofertas. Si el backend no responde, usa los datos de
// ejemplo para que la página funcione en la demostración.
@Injectable({ providedIn: 'root' })
export class OfertasService {
  private http = inject(HttpClient);

  listar(): Observable<ResultadoOfertas> {
    return this.http.get<OfertaApi[]>('/api/ofertas').pipe(
      timeout(5000),
      map((lista) => lista.map((o) => this.convertir(o)).filter((o) => o.descuento >= DESCUENTO_MINIMO)),
      map((ofertas): ResultadoOfertas =>
        ofertas.length ? { ofertas, origen: 'bd' } : this.deEjemplo(),
      ),
      catchError(() => of(this.deEjemplo())),
    );
  }

  private deEjemplo(): ResultadoOfertas {
    const ofertas = EJEMPLO.map(([nombre, marca, precioLista, descuento, imagen], i) => ({
      id: 1000 + i,
      nombre,
      marca,
      imagen,
      precioLista,
      descuento,
      precioOferta: redondear(precioLista * (1 - descuento / 100)),
    }));
    return { ofertas, origen: 'ejemplo' };
  }

  private convertir(o: OfertaApi): Oferta {
    const lista = Number(o.precioLista ?? o.precioVenta ?? 0);
    let oferta = Number(o.precioOferta ?? 0);
    let descuento = Number(o.descuento ?? o.porcentajeDescuento ?? 0);
    // Completa el dato que falte (precio o porcentaje).
    if (!oferta && descuento) oferta = redondear(lista * (1 - descuento / 100));
    if (!descuento && oferta && lista) descuento = Math.round((1 - oferta / lista) * 100);
    return {
      id: Number(o.idProducto ?? o.id ?? 0),
      nombre: o.nombre,
      marca: (typeof o.marca === 'string' ? o.marca : o.marca?.nombre) ?? '',
      imagen: o.imagen ?? '',
      precioLista: lista,
      precioOferta: oferta,
      descuento,
    };
  }
}
