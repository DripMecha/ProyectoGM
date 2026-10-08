import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Producto } from '../../core/models/producto';
import { ProductoService } from '../../core/services/producto.service';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';

type Orden = 'relevancia' | 'precio-asc' | 'precio-desc' | 'nombre';
type Vista = 'cuadricula' | 'lista';

@Component({
  selector: 'app-catalogo',
  imports: [FormsModule, RouterLink, CurrencyPipe, DatePipe, Header, Footer],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.scss',
})
export class CatalogoComponent implements OnInit {
  private svc = inject(ProductoService);

  // ---------- Estado (signals) ----------
  productos = signal<Producto[]>([]);
  texto = signal('');                 // búsqueda DINÁMICA (mientras se escribe)
  marcasSel = signal<string[]>([]);   // filtro por marcas (casillas)
  precioDesde = signal(0);
  precioHasta = signal(0);
  orden = signal<Orden>('relevancia');
  porPagina = signal(12);
  pagina = signal(1);
  vista = signal<Vista>('cuadricula');
  filtrosAbiertos = signal(false);    // solo se usa en celular
  private fallidas = signal<Record<number, boolean>>({});

  opcionesPorPagina = [12, 24, 36];

  // ---------- Datos derivados (se recalculan solos) ----------
  limites = computed(() => {
    const precios = this.productos().map(p => p.precio);
    return precios.length
      ? { min: Math.floor(Math.min(...precios)), max: Math.ceil(Math.max(...precios)) }
      : { min: 0, max: 0 };
  });

  marcas = computed(() => {
    const conteo = new Map<string, number>();
    for (const p of this.productos()) {
      conteo.set(p.marca, (conteo.get(p.marca) ?? 0) + 1);
    }
    return [...conteo.entries()]
      .map(([nombre, cantidad]) => ({ nombre, cantidad }))
      .sort((a, b) => a.nombre.localeCompare(b.nombre));
  });

  filtrados = computed(() => {
    const t = this.normalizar(this.texto());
    const marcas = this.marcasSel();
    const desde = this.precioDesde();
    const hasta = this.precioHasta();

    let lista = this.productos().filter(
      p =>
        (!t ||
          this.normalizar(p.nombre).includes(t) ||
          this.normalizar(p.descripcion).includes(t) ||
          this.normalizar(p.marca).includes(t)) &&
        (marcas.length === 0 || marcas.includes(p.marca)) &&
        p.precio >= desde &&
        p.precio <= hasta
    );

    switch (this.orden()) {
      case 'precio-asc':
        lista = [...lista].sort((a, b) => a.precio - b.precio);
        break;
      case 'precio-desc':
        lista = [...lista].sort((a, b) => b.precio - a.precio);
        break;
      case 'nombre':
        lista = [...lista].sort((a, b) => a.nombre.localeCompare(b.nombre));
        break;
    }
    return lista;
  });

  hayFiltros = computed(
    () =>
      this.texto().trim() !== '' ||
      this.marcasSel().length > 0 ||
      this.precioDesde() > this.limites().min ||
      this.precioHasta() < this.limites().max
  );

  totalPaginas = computed(() => Math.max(1, Math.ceil(this.filtrados().length / this.porPagina())));
  paginaActual = computed(() => Math.min(this.pagina(), this.totalPaginas()));

  paginados = computed(() => {
    const ini = (this.paginaActual() - 1) * this.porPagina();
    return this.filtrados().slice(ini, ini + this.porPagina());
  });

  desde = computed(() =>
    this.filtrados().length === 0 ? 0 : (this.paginaActual() - 1) * this.porPagina() + 1
  );
  hasta = computed(() => Math.min(this.paginaActual() * this.porPagina(), this.filtrados().length));

  // 0 representa los puntos suspensivos "…"
  paginasVisibles = computed(() => {
    const t = this.totalPaginas();
    const a = this.paginaActual();
    if (t <= 7) return Array.from({ length: t }, (_, i) => i + 1);
    const res: number[] = [1];
    if (a > 3) res.push(0);
    for (let i = Math.max(2, a - 1); i <= Math.min(t - 1, a + 1); i++) res.push(i);
    if (a < t - 2) res.push(0);
    res.push(t);
    return res;
  });

  // ---------- Ciclo de vida ----------
  ngOnInit(): void {
    // Mismo servicio que usa el CRUD: lo que el administrador registre aparece aquí.
    this.svc.listar().subscribe(lista => {
      this.productos.set(lista);
      this.precioDesde.set(this.limites().min);
      this.precioHasta.set(this.limites().max);
    });
  }

  // ---------- Acciones ----------
  private normalizar(s: string): string {
    return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  }

  onTexto(v: string): void {
    this.texto.set(v);
    this.pagina.set(1);
  }

  toggleMarca(marca: string, marcada: boolean): void {
    this.marcasSel.update(sel => (marcada ? [...sel, marca] : sel.filter(m => m !== marca)));
    this.pagina.set(1);
  }

  onDesde(v: number): void {
    this.precioDesde.set(Math.min(Number(v), this.precioHasta()));
    this.pagina.set(1);
  }

  onHasta(v: number): void {
    this.precioHasta.set(Math.max(Number(v), this.precioDesde()));
    this.pagina.set(1);
  }

  cambiarOrden(o: Orden): void {
    this.orden.set(o);
    this.pagina.set(1);
  }

  cambiarPorPagina(n: number): void {
    this.porPagina.set(Number(n));
    this.pagina.set(1);
  }

  irPagina(n: number): void {
    if (n >= 1 && n <= this.totalPaginas()) {
      this.pagina.set(n);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  limpiar(): void {
    this.texto.set('');
    this.marcasSel.set([]);
    this.precioDesde.set(this.limites().min);
    this.precioHasta.set(this.limites().max);
    this.orden.set('relevancia');
    this.pagina.set(1);
  }

  imagenFallida(id: number): void {
    this.fallidas.update(f => ({ ...f, [id]: true }));
  }

  tieneImagen(p: Producto): boolean {
    return !!p.imagen && !this.fallidas()[p.id];
  }
}