import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Producto } from '../../../core/models/producto';
import { ProductoService } from '../../../core/services/producto.service';
import { AuthService } from '../../../core/services/auth.service';

type Modo = 'crear' | 'editar' | 'ver';

@Component({
    selector: 'app-admin-crud',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],
})
export class AdminCrudComponent implements OnInit {
    productos: Producto[] = [];

    // Búsqueda DINÁMICA: se filtra mientras se escribe.
    textoBusqueda = '';
    // Búsqueda ESTÁTICA: se elige una marca y solo se aplica al pulsar "Buscar".
    marcaSel = '';
    marcaAplicada = '';

    // Paginación
    pagina = 1;
    filasPorPagina = 10;
    opcionesFilas = [5, 10, 20];

    // Modal crear / editar / ver
    modalAbierto = false;
    modo: Modo = 'crear';
    form: Producto = this.vacio();

    // Confirmación de eliminación
    porEliminar: Producto | null = null;

    mensaje = '';
    imagenesFallidas: Record<number, boolean> = {};

    constructor(
        private svc: ProductoService,
        private auth: AuthService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.cargar();
    }

    cargar(): void {
        this.svc.listar().subscribe(lista => (this.productos = lista));
    }

    // ---------- Búsqueda y filtros ----------
    private normalizar(s: string): string {
        return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
    }

    get marcas(): string[] {
        return [...new Set(this.productos.map(p => p.marca))].sort();
    }

    get filtrados(): Producto[] {
        const t = this.normalizar(this.textoBusqueda);
        return this.productos.filter(p => {
            const coincideTexto =
                !t ||
                this.normalizar(p.nombre).includes(t) ||
                this.normalizar(p.descripcion).includes(t) ||
                this.normalizar(p.marca).includes(t);
            const coincideMarca = !this.marcaAplicada || p.marca === this.marcaAplicada;
            return coincideTexto && coincideMarca;
        });
    }

    onTexto(valor: string): void {
        this.textoBusqueda = valor;
        this.pagina = 1;
    }

    aplicarMarca(): void {
        this.marcaAplicada = this.marcaSel;
        this.pagina = 1;
    }

    quitarTexto(): void {
        this.textoBusqueda = '';
        this.pagina = 1;
    }

    quitarMarca(): void {
        this.marcaSel = '';
        this.marcaAplicada = '';
        this.pagina = 1;
    }

    limpiar(): void {
        this.quitarTexto();
        this.quitarMarca();
    }

    // ---------- Paginación ----------
    get totalPaginas(): number {
        return Math.max(1, Math.ceil(this.filtrados.length / this.filasPorPagina));
    }

    get paginados(): Producto[] {
        const pag = Math.min(this.pagina, this.totalPaginas);
        const ini = (pag - 1) * this.filasPorPagina;
        return this.filtrados.slice(ini, ini + this.filasPorPagina);
    }

    get desde(): number {
        return this.filtrados.length === 0 ? 0 : (this.pagina - 1) * this.filasPorPagina + 1;
    }

    get hasta(): number {
        return Math.min(this.pagina * this.filasPorPagina, this.filtrados.length);
    }

    // 0 representa los puntos suspensivos "…"
    get paginasVisibles(): number[] {
        const t = this.totalPaginas;
        const a = this.pagina;
        if (t <= 7) return Array.from({ length: t }, (_, i) => i + 1);
        const res: number[] = [1];
        if (a > 3) res.push(0);
        for (let i = Math.max(2, a - 1); i <= Math.min(t - 1, a + 1); i++) res.push(i);
        if (a < t - 2) res.push(0);
        res.push(t);
        return res;
    }

    irPagina(n: number): void {
        if (n >= 1 && n <= this.totalPaginas) this.pagina = n;
    }

    cambiarFilas(n: number): void {
        this.filasPorPagina = Number(n);
        this.pagina = 1;
    }

    // ---------- Crear / editar / ver ----------
    private vacio(): Producto {
        return { id: 0, nombre: '', descripcion: '', marca: '', fechaVencimiento: null, precio: 0, imagen: '' };
    }

    get tituloModal(): string {
        return { crear: 'Nuevo producto', editar: 'Editar producto', ver: 'Detalle del producto' }[this.modo];
    }

    abrirCrear(): void {
        this.modo = 'crear';
        this.form = this.vacio();
        this.modalAbierto = true;
    }

    abrirVer(p: Producto): void {
        this.modo = 'ver';
        this.form = { ...p };
        this.modalAbierto = true;
    }

    abrirEditar(p: Producto): void {
        this.modo = 'editar';
        this.form = { ...p };
        this.modalAbierto = true;
    }

    cerrarModal(): void {
        this.modalAbierto = false;
    }

    guardar(f: NgForm): void {
        if (f.invalid) {
            f.form.markAllAsTouched();
            return;
        }
        const datos = {
            ...this.form,
            nombre: this.form.nombre.trim(),
            descripcion: this.form.descripcion.trim(),
            marca: this.form.marca.trim(),
            precio: Number(this.form.precio),
            fechaVencimiento: this.form.fechaVencimiento || null,
            imagen: (this.form.imagen || '').trim(),
        };

        if (this.modo === 'crear') {
            const { id, ...sinId } = datos;
            this.svc.crear(sinId).subscribe(() => {
                this.cargar();
                this.cerrarModal();
                this.notificar('Producto registrado correctamente.');
            });
        } else {
            this.svc.actualizar(datos).subscribe(() => {
                this.imagenesFallidas[datos.id] = false;
                this.cargar();
                this.cerrarModal();
                this.notificar('Producto actualizado correctamente.');
            });
        }
    }

    // ---------- Eliminar ----------
    pedirEliminar(p: Producto): void {
        this.porEliminar = p;
    }

    cancelarEliminar(): void {
        this.porEliminar = null;
    }

    confirmarEliminar(): void {
        if (!this.porEliminar) return;
        const id = this.porEliminar.id;
        this.svc.eliminar(id).subscribe(() => {
            this.porEliminar = null;
            this.cargar();
            if (this.pagina > this.totalPaginas) this.pagina = this.totalPaginas;
            this.notificar('Producto eliminado.');
        });
    }

    // ---------- Otros ----------
    cerrarSesion(): void {
        this.auth.logout();
        this.router.navigate(['/login']);
    }

    trackById(_: number, p: Producto): number {
        return p.id;
    }

    private notificar(texto: string): void {
        this.mensaje = texto;
        setTimeout(() => (this.mensaje = ''), 2800);
    }
}