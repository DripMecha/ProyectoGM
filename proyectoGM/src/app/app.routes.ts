import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { AdminCrudComponent } from './features/admin/admin-crud/admin.component';
import { adminGuard } from './core/guards/admin.guards';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/inicio-publico/inicio-publico').then(m => m.InicioPublicoComponent),
  },
  {
    path: 'catalogo',
    loadComponent: () =>
      import('./features/catalogo/catalogo.component').then(m => m.CatalogoComponent),
  },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminCrudComponent, canActivate: [adminGuard] },
];