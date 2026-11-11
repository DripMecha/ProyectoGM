import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

// Franja azul con el título de la página y las migas de pan (Inicio › Título).
// Uso:  <app-banner titulo="Nosotros" />
@Component({
  selector: 'app-banner',
  imports: [RouterLink],
  templateUrl: './banner.html',
  styleUrl: './banner.scss',
})
export class Banner {
  titulo = input.required<string>();
}
