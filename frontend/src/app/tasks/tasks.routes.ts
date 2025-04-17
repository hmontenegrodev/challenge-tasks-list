import { Routes } from '@angular/router';

export const tasksRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/task-list.component').then(m => m.TaskListComponent)
    }];