import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { Post } from './components/post/post';

export const routes: Routes = [
    {path: '', component: Dashboard},
    {path: 'Crear', component: Post}
    
];
