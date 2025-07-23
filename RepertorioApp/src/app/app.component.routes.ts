import { Routes } from '@angular/router';
import { LouvorListComponent } from './pages/louvor-list/louvor-list.component';
import { GerarRepertorioComponent } from './pages/gerar-repertorio/gerar-repertorio.component';
import { LouvorFormComponent } from './pages/louvor-form/louvor-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'buscar', pathMatch: 'full' },
  { path: 'buscar', component: LouvorListComponent, data: { reuse: true } },
  {
    path: 'gerar-repertorio', component: GerarRepertorioComponent, data: { reuse: true },
  },
  { path: 'louvor-form', component: LouvorFormComponent, data: { reuse: true } },
  { path: 'louvor-form/:id', component: LouvorFormComponent, }
];
