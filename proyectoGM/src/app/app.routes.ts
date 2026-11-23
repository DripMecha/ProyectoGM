
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
  {
    path: 'nosotros',
    loadComponent: () =>
      import('./features/nosotros/nosotros').then(m => m.NosotrosComponent),
  },
  {
    path: 'desarrolladores',
    loadComponent: () =>
      import('./features/desarrolladores/desarrolladores.component')
        .then(m => m.DesarrolladoresComponent),
  },
  {
    path: 'metodologia',
    loadComponent: () =>
      import('./features/metodologia/metodologia').then(m => m.MetodologiaComponent),
  },

  {
    path: 'contactos',
    loadComponent: () =>
      import('./features/contactos/contactos').then(m => m.ContactosComponent),
  },

  {
    path: 'admin/reportes',
    loadComponent: () =>
      import('./features/admin/reportes/reportes').then(m => m.ReportesComponent),
    canActivate: [adminGuard],
  },

  {
    path: 'finalidad',
    loadComponent: () =>
      import('./features/finalidad/finalidad').then(m => m.FinalidadComponent),
  },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminCrudComponent, canActivate: [adminGuard] },
];
