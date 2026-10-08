export interface Producto {
    id: number;                       // entero autoincrementable (en la BD será la PK)
    nombre: string;
    descripcion: string;
    marca: string;
    fechaVencimiento: string | null;  // formato AAAA-MM-DD, solo si el producto lo requiere
    precio: number;
    imagen: string;                   // URL o ruta (ej.: assets/productos/filtro.png)
}