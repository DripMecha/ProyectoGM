import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Header } from '../../../shared/header/header';
import { Footer } from '../../../shared/footer/footer';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, Header, Footer],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email = '';
  password = '';
  verPassword = false;
  cargando = false;
  error = '';

  constructor(private auth: AuthService, private router: Router) {
    // Si ya hay sesión, no mostrar el login otra vez.
    if (this.auth.estaLogueado) {
      this.router.navigate([this.auth.esAdmin ? '/admin' : '/']);
    }
  }

  ingresar(f: NgForm): void {
    this.error = '';
    if (f.invalid) {
      f.form.markAllAsTouched();
      return;
    }
    this.cargando = true;
    this.auth.login(this.email.trim(), this.password).subscribe({
      next: sesion => {
        this.cargando = false;
        // El administrador va al CRUD; el usuario normal vuelve al inicio.
        this.router.navigate([sesion.rol === 'admin' ? '/admin' : '/']);
      },
      error: (e: Error) => {
        this.cargando = false;
        this.error = e.message;
      },
    });
  }
}