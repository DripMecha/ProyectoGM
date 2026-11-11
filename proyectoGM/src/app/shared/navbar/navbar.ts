import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  auth = inject(AuthService);

  // Para agregar o quitar una sección del menú, solo se edita esta lista.
  enlaces = [
    { texto: 'Inicio', ruta: '/' },
    { texto: 'Nosotros', ruta: '/nosotros' },
    { texto: 'Desarrolladores', ruta: '/desarrolladores' },
    { texto: 'Metodología', ruta: '/metodologia' },
    { texto: 'Finalidad', ruta: '/finalidad' },
    { texto: 'Catálogo', ruta: '/catalogo' },
  ];

  menuAbierto = false;

  alternarMenu(): void {
    this.menuAbierto = !this.menuAbierto;
  }

  cerrarMenu(): void {
    this.menuAbierto = false;
  }

  cerrarSesion(): void {
    this.auth.logout();
    this.cerrarMenu();
  }
}
