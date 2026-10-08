import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

export type Rol = 'admin' | 'usuario';

export interface Sesion {
  email: string;
  nombre: string;
  rol: Rol;
}

// TODO (Integrante 3): cuando exista el backend, reemplazar USUARIOS_PRUEBA
// por una llamada HttpClient.post('/api/auth/login', { email, password }).
// Las contraseñas NUNCA deben guardarse en texto plano en la BD real (usar hash).
const USUARIOS_PRUEBA = [
  { email: 'admin@gm.com', password: 'admin123', nombre: 'Administrador GM', rol: 'admin' as Rol },
  { email: 'usuario@gm.com', password: 'usuario123', nombre: 'Usuario GM', rol: 'usuario' as Rol },
];

const CLAVE = 'gm_sesion';

@Injectable({ providedIn: 'root' })
export class AuthService {
  login(email: string, password: string): Observable<Sesion> {
    const u = USUARIOS_PRUEBA.find(
      x => x.email.toLowerCase() === email.toLowerCase() && x.password === password
    );
    if (!u) {
      return throwError(() => new Error('Correo o contraseña incorrectos.'));
    }
    const sesion: Sesion = { email: u.email, nombre: u.nombre, rol: u.rol };
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(CLAVE, JSON.stringify(sesion));
    }
    return of(sesion);
  }

  logout(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(CLAVE);
    }
  }

  get sesion(): Sesion | null {
    if (typeof localStorage === 'undefined') return null;
    const raw = localStorage.getItem(CLAVE);
    return raw ? (JSON.parse(raw) as Sesion) : null;
  }

  get estaLogueado(): boolean {
    return this.sesion !== null;
  }

  get esAdmin(): boolean {
    return this.sesion?.rol === 'admin';
  }
}