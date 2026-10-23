import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Producto } from '../models/producto';

// Datos de ejemplo. Se reemplazan por la BD real. <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< (Tener en cuenta)
type Semilla = [string, string, number, string | null, string?];
const SEMILLA: Semilla[] = [
  // Productos de la empresa (imágenes en public/image)
  ['Bobina de encendido', 'Hyundai', 120, null, '/image/BobinaEncendido-hyundai120.jpg'],
  ['Bujía de iridio NGK (4 u.)', 'Kia', 65, null, '/image/Bujia.jpg'],
  ['Aceite Hyundai SP 10W-30', 'Hyundai', 70, null, '/image/AceiteHyundai10w30.jpg'],
  ['Soporte de motor hidráulico I25/I35', 'Hyundai', 200, null, '/image/SoporteHidraulico.jpg'],
  ['Soporte motor central inferior 1.6 G4fc', 'Hyundai', 180, null, '/image/SoporteInferior180.jpg'],
  ['Filtro de aceite Tucson', 'Hyundai-Mann', 25, null, '/image/FiltroAceite1KIA.jpg'],
  ['Filtro de aceite Elantra', 'Hyundai', 28.5, null, '/image/FiltroAceiteElantra.jpg'],
  ['Filtro de aire Rio', 'Kia', 35, null, '/image/FiltroAireRio.jpg'],
  ['Pastillas de freno delanteras Accent', 'Hyundai', 120, null, '/image/PastillasFrenoAccent.jpg'],
  ['Pastillas de freno traseras Sportage', 'Kia', 110, null, '/image/PastillasFrenoTraseroSportage.jpg'],
  ['Aceite de motor 5W-30 1 L', 'Mobis', 42, '2028-12-31', '/image/AceiteMobis5w301L.jpg'],
  ['Aceite de motor 5W-30 4 L', 'Mobis', 150, '2028-12-31', '/image/AceiteMobis5w304L.jpg'],
  ['Líquido de frenos DOT 4', 'Mobis', 25, '2028-06-30', '/image/LiquidoFrenosDOT4.jpg'],
  ['Refrigerante larga duración 1 galón', 'Mobis', 48, '2029-01-31', '/image/RefrigeranteLargaDuracion1GL.jpg'],
  ['Bujía de iridio Tucson', 'Hyundai', 38, null, '/image/BujiaIridioTucson.jpg'],
  ['Bujía Picanto', 'Kia', 22, null, '/image/BujiaPicanto.jpg'],
  ['Batería 12V 55Ah', 'Mobis', 380, null, '/image/Bateria12v55AH.jpg'],
  ['Faro delantero derecho Creta', 'Hyundai', 650, null, '/image/FaroDelanteroDerechoCreta.jpg'],
  ['Faro delantero izquierdo Creta', 'Hyundai', 650, null, '/image/FaroDelanteroIzquierdoCreta.jpg'],
  ['Amortiguador delantero Seltos', 'Kia', 290, null, '/image/AmortiguadorDelanteroSeltos.jpg'],
  ['Amortiguador trasero Seltos', 'Kia', 240, null, '/image/AmortiguadorTraseroSeltos.jpg'],
  ['Correa de distribución Cerato', 'Kia', 180, null, '/image/CorreaDistribucionCerato.jpg'],
  ['Kit de embrague Elantra', 'Hyundai', 720, null, '/image/KitEmbragueElantra.jpg'],
  ['Disco de freno ventilado Santa Fe', 'Hyundai', 260, null, '/image/DiscoFrenoVentiladoSantaFe.jpg'],
  ['Radiador Sorento', 'Kia', 540, null, '/image/RadiadorSorento.jpg'],
  ['Bomba de agua Accent', 'Hyundai', 160, null, '/image/BombaAguaAccent.jpg'],
  ['Limpiaparabrisas par 24"', 'Mobis', 55, null, '/image/Limpiaparabrisas24.jpg'],
  ['Filtro de combustible Sportage', 'Kia', 70, null, '/image/FiltroCombustibleSportage.jpg'],
  ['Aceite de transmisión ATF SP-IV 1 L', 'Mobis', 46, '2028-09-30', '/image/AceiteTransmisionAtf.jpg'],
  ['Foco LED H7', 'Mobis', 45, null, '/image/FocoLedH7.jpg'],
];

// TODO (Integrante 3): reemplazar el cuerpo de cada método por HttpClient
// (GET/POST/PUT/DELETE a /api/productos). Las firmas pueden quedarse igual,
// así el CRUD (componente) no necesita cambios.
@Injectable({ providedIn: 'root' })
export class ProductoService {
    private datos: Producto[] = SEMILLA.map(([nombre, marca, precio, venc, imagen], i) => ({
        id: i + 1,
        nombre,
        descripcion: `Repuesto genuino ${marca} (dato de ejemplo).`,
        marca,
        fechaVencimiento: venc,
        precio,
        imagen: imagen ?? '',
    }));
    private siguienteId = SEMILLA.length + 1;

    listar(): Observable<Producto[]> {
        return of(this.datos.map(p => ({ ...p })));
    }

    crear(p: Omit<Producto, 'id'>): Observable<Producto> {
        const nuevo: Producto = { ...p, id: this.siguienteId++ };
        this.datos = [nuevo, ...this.datos];
        return of({ ...nuevo });
    }

    actualizar(p: Producto): Observable<Producto> {
        this.datos = this.datos.map(x => (x.id === p.id ? { ...p } : x));
        return of({ ...p });
    }

    eliminar(id: number): Observable<void> {
        this.datos = this.datos.filter(x => x.id !== id);
        return of(void 0);
    }
}