import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { Navbar } from '../../shared/navbar/navbar';
import { Banner } from '../../shared/banner/banner';
import { Footer } from '../../shared/footer/footer';

// Responsable: Abel Mucha (rama feature/nosotros)

interface Slide {
  imagen: string;
  titulo: string;
  texto: string;
}

interface Puesto {
  cargo: string;
  nombre: string;
  funcion: string;
}

@Component({
  selector: 'app-nosotros',
  imports: [Navbar, Banner, Footer],
  templateUrl: './nosotros.html',
  styleUrl: './nosotros.scss',
})
export class NosotrosComponent implements OnInit, OnDestroy {
  // ---------- 1. SLIDER (3 imágenes) ----------
  // Para cambiar las fotos, reemplaza la ruta de "imagen" (carpeta public/image).
  slides: Slide[] = [
    {
      imagen: 'image/Carrusel1.jpg',
      titulo: 'Quiénes somos',
      texto:
        'Genuine Motors (ROY IMPORT COMPANY EIRL) es una empresa de repuestos automotrices ubicada en La Victoria, Lima.',
    },
    {
      imagen: 'image/Carrusel2.png',
      titulo: 'Calidad y rapidez',
      texto:
        'Queremos que nuestros clientes elijan por la calidad de nuestros repuestos y la rapidez de la atención, no solo por el precio.',
    },
    {
      imagen: 'image/Carrusel3.png',
      titulo: 'Repuestos Hyundai y KIA',
      texto:
        'Trabajamos con proveedores como Hyundai y Autorrepuestos Alvarado para atender a talleres mecánicos de todo Lima.',
    },
  ];

  actual = signal(0);
  private timer?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    this.iniciarAuto();
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  siguiente(): void {
    this.actual.update((i) => (i + 1) % this.slides.length);
    this.iniciarAuto();
  }

  anterior(): void {
    this.actual.update((i) => (i - 1 + this.slides.length) % this.slides.length);
    this.iniciarAuto();
  }

  irA(indice: number): void {
    this.actual.set(indice);
    this.iniciarAuto();
  }

  // Cambia de imagen cada 5 segundos; se reinicia al hacer clic.
  private iniciarAuto(): void {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.actual.update((i) => (i + 1) % this.slides.length);
    }, 5000);
  }

  // ---------- 2. ORGANIGRAMA ----------
  // Los cargos 1, 2 y 3 son una propuesta: confirmarlos con el grupo / la empresa.
  jefe: Puesto = {
    cargo: 'Jefe de organización',
    nombre: 'Roy Yosmel Alvarado Tucto',
    funcion: 'Gerente general. Dirige la empresa y toma las decisiones principales.',
  };

  coordinador: Puesto = {
    cargo: 'Coordinador',
    nombre: 'Por definir',
    funcion: 'Organiza el trabajo diario entre las áreas y supervisa los pedidos.',
  };

  cargos: Puesto[] = [
    {
      cargo: 'Cargo 1 · Ventas',
      nombre: 'Por definir',
      funcion: 'Atiende a los clientes y talleres, cotiza y registra las ventas.',
    },
    {
      cargo: 'Cargo 2 · Almacén y logística',
      nombre: 'Por definir',
      funcion: 'Controla el stock de repuestos, recibe a proveedores y despacha pedidos.',
    },
    {
      cargo: 'Cargo 3 · Administración y caja',
      nombre: 'Por definir',
      funcion: 'Lleva la facturación, los pagos y los reportes de la empresa.',
    },
  ];

  contacto = {
    cargo: 'Personal de contacto',
    nombre: 'Roy Yosmel Alvarado Tucto',
    telefono: '934 515 537',
    correo: 'corporacionroy@outlook.com',
    direccion: 'Jr. Antonio Raimondi 239 Int. 60, La Victoria',
  };

  // ---------- 3. FOTO Y DESCRIPCIÓN DEL EQUIPO ----------
  // Reemplazar por una foto real del equipo de la tienda cuando la tengan.
  fotoEquipo = 'image/GM_Fondo_Login.jpg';

  valores = [
    { titulo: 'Calidad', texto: 'Repuestos originales y de marcas confiables.' },
    { titulo: 'Rapidez', texto: 'Atención y despacho en el menor tiempo posible.' },
    { titulo: 'Confianza', texto: 'Relaciones duraderas con talleres y clientes.' },
  ];
}
