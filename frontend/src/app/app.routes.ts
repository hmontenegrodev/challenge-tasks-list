import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { loginRedirectGuard } from './core/guards/login-redirect.guard';

export const routes: Routes = [
    {
        path: 'login',
        loadChildren: () => import('./features/auth/auth.routes').then(m => m.authRoutes),
        canActivate: [loginRedirectGuard],
    },
    {
        path: 'tasks',
        loadChildren: () => import('./features/tasks/tasks.routes').then(m => m.tasksRoutes),
        canActivate: [authGuard],
    },
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'tasks',
    },
    {
      path: '**',
      redirectTo: 'tasks',
    },
];
