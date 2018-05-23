import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcessoComponent } from './acesso/acesso.component';
import { AuthGuard } from './auth-guard.service';
import { EventosComponent } from './eventos/eventos.component';

const routes: Routes = [
  {
    path: '',
    component: AcessoComponent
  },
  {
    path: 'eventos',
    component: EventosComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
