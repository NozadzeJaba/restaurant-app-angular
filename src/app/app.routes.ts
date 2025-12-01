import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { BasketComponent } from './pages/basket.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'basket', component: BasketComponent },
  { path: '**', redirectTo: '' }
];
