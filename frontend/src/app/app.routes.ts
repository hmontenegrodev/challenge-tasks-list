import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.routes').then(m => m.authRoutes)
    },
    {
        path: 'tasks',
        loadChildren: () => import('./tasks/tasks.routes').then(m => m.tasksRoutes)
    },
    {
        path: '',
        redirectTo: 'auth/login',
        pathMatch: 'full',
    },
];
