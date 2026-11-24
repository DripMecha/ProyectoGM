import { Origen } from '../services/catalogo.service';

// Un producto en oferta (Abel · rama feature/ofertas).
export interface Oferta {
  id: number;
  nombre: string;
  marca: string;
  imagen: string;
  precioLista: number; // precio normal (se muestra tachado)
  precioOferta: number; // precio con descuento
  descuento: number; // porcentaje, mínimo 5
}

export interface ResultadoOfertas {
  ofertas: Oferta[];
  origen: Origen; // 'bd' = backend, 'ejemplo' = datos de ejemplo
}
