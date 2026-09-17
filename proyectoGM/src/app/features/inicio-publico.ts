import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

// Interfaces
interface Resena {
  autor: string;
  tipoUsuario: string;
  haceCuanto: string;
  estrellas: number;
  comentario: string;
  avatar: string;
}

interface BannerSlide {
  id: number;
  imagen: string;
  titulo: string;
}

@Component({
  selector: 'app-inicio-publico',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio-publico.html',
  styleUrl: './inicio-publico.scss'
})
export class InicioPublicoComponent implements OnInit, OnDestroy {

  // --- 1. LÓGICA DEL CARRUSEL DINÁMICO ---
  slides: BannerSlide[] = [
    {
      id: 1,
      imagen: 'image/Carrusel1.jpg',
      titulo: 'Aceites y Lubricantes para Motor'
    },
    {
      id: 2,
      imagen: 'image/Carrusel2.png',
      titulo: 'Kits de Embrague y Suspensión'
    },
    {
      id: 3,
      imagen: 'image/Carrusel3.png',
      titulo: 'Repuestos Originales Hyundai'
    }
  ];

  currentIndex: number = 0;
  private autoSlideTimer: any;

  ngOnInit(): void {
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
  }

  startAutoSlide(): void {
    this.autoSlideTimer = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  stopAutoSlide(): void {
    if (this.autoSlideTimer) {
      clearInterval(this.autoSlideTimer);
    }
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }

  prevSlide(): void {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
  }

  goToSlide(index: number): void {
    this.currentIndex = index;
  }

  // --- 2. DATA DE RESEÑAS / TESTIMONIOS ---
  resenas: Resena[] = [
    {
      autor: 'Taller AutoFix La Victoria',
      tipoUsuario: 'Taller Mecánico Aliado',
      haceCuanto: 'hace 1 mes',
      estrellas: 5,
      comentario: 'Excelente servicio con Genuine Motors. Los pedidos de kits de embrague y repuestos Hyundai nos llegan a tiempo para los trabajos en el taller.',
      avatar: 'assets/img/avatars/taller1.jpg'
    },
    {
      autor: 'Carlos Mendoza',
      tipoUsuario: 'Cliente Particular',
      haceCuanto: 'hace 2 meses',
      estrellas: 5,
      comentario: 'Compré aceite Castrol y filtros originales. Buena atención, rápida respuesta por WhatsApp y productos 100% garantizados.',
      avatar: 'assets/img/avatars/user2.jpg'
    },
    {
      autor: 'Multiservicios R&M',
      tipoUsuario: 'Taller Mecánico',
      haceCuanto: 'hace 3 semanas',
      estrellas: 5,
      comentario: 'Garantía total en repuestos de suspensión y bobinas. Nos brindan precios competitivos para nuestro negocio.',
      avatar: 'assets/img/avatars/taller2.jpg'
    }
  ];

}