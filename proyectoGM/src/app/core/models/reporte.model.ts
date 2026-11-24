export type OrigenReporte = 'bd' | 'ejemplo';

// Un reporte listo para mostrarse: datos del gráfico + descripción del resultado.
export interface Reporte {
  titulo: string;
  etiquetas: string[];
  valores: number[];
  descripcion: string;
  origen: OrigenReporte; // 'bd' = datos del backend, 'ejemplo' = datos de ejemplo
}

// Lo que debe devolver el backend en cada endpoint /api/reportes/...
export interface DatosReporte {
  etiquetas: string[];
  valores: number[];
}
