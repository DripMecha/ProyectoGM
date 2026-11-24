import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Navbar } from '../../shared/navbar/navbar';
import { Banner } from '../../shared/banner/banner';
import { Footer } from '../../shared/footer/footer';

interface Diapositiva {
  titulo: string;
  texto: string;
  imagen?: string; // ruta de la foto, por ejemplo '/image/contacto-1.jpg'
}

interface Opinion {
  nombre: string;
  detalle: string;
  comentario: string;
  estrellas: number;
}

@Component({
  selector: 'app-contactos',
  imports: [Navbar, Banner, Footer, ReactiveFormsModule],
  templateUrl: './contactos.html',
  styleUrl: './contactos.scss',
})
export class ContactosComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private sanitizer = inject(DomSanitizer);

  // ---------- Slider ----------
  // Para usar fotos reales: guarda las imágenes en public/image y agrega
  // la propiedad imagen, por ejemplo  imagen: '/image/contacto-1.jpg'
  diapositivas: Diapositiva[] = [
    { titulo: 'Repuestos genuinos', texto: 'Hyundai y Kia, con la garantía del respaldo original.', imagen: '/image/hyundaikia.webp' },
    { titulo: 'Atención personalizada', texto: 'Te ayudamos a encontrar el repuesto que tu vehículo necesita.', imagen: '/image/PartesVehiculos.webp' },
    { titulo: 'Visítanos', texto: 'Estamos en La Victoria. Te esperamos en nuestra tienda.', imagen: '/image/LogoGM_Presencial.jpg' },
  ];
  actual = signal(0);
  private temporizador?: ReturnType<typeof setInterval>;

  // ---------- Opiniones ----------
  // Opiniones de ejemplo: reemplazar por opiniones reales de clientes.
  opiniones: Opinion[] = [
    { nombre: 'Carlos M.', detalle: 'Cliente Hyundai', comentario: 'Encontré el repuesto original que buscaba y me lo recomendaron rápido.', estrellas: 5 },
    { nombre: 'Lucía R.', detalle: 'Cliente Kia', comentario: 'Muy buena atención y los precios son claros. Volveré a comprar.', estrellas: 5 },
    { nombre: 'Jorge P.', detalle: 'Taller mecánico', comentario: 'Buen stock de piezas genuinas y entrega puntual para mi taller.', estrellas: 4 },
  ];
  estrellas = [1, 2, 3, 4, 5];

  // ---------- Formulario ----------
  formulario = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    correo: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.pattern(/^[0-9]{9}$/)]],
    asunto: ['', [Validators.required]],
    mensaje: ['', [Validators.required, Validators.minLength(10)]],
  });
  intento = signal(false);
  enviado = signal(false);

  // ---------- Mapa ----------
  mapaUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    'https://www.google.com/maps?q=Jir%C3%B3n+Antonio+Raimondi+239,+La+Victoria,+Lima&output=embed'
  );

  ngOnInit(): void {
    this.temporizador = setInterval(() => this.siguiente(), 4000);
  }

  ngOnDestroy(): void {
    clearInterval(this.temporizador);
  }

  siguiente(): void {
    this.actual.update(i => (i + 1) % this.diapositivas.length);
  }

  anterior(): void {
    this.actual.update(i => (i - 1 + this.diapositivas.length) % this.diapositivas.length);
  }

  ir(i: number): void {
    this.actual.set(i);
  }

  invalido(campo: 'nombre' | 'correo' | 'telefono' | 'asunto' | 'mensaje'): boolean {
    const c = this.formulario.controls[campo];
    return c.invalid && (c.touched || this.intento());
  }

  enviar(): void {
    this.intento.set(true);
    this.enviado.set(false);
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    // Aquí se podría enviar el mensaje al backend. Por ahora solo se confirma.
    this.enviado.set(true);
    this.formulario.reset();
    this.intento.set(false);
  }
}
