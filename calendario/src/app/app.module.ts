import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AcessoComponent } from './acesso/acesso.component';
import { LoginComponent } from './acesso/login/login.component';
import { CadastroComponent } from './acesso/cadastro/cadastro.component';
import { EventosComponent } from './eventos/eventos.component';
import { TopoComponent } from './topo/topo.component';

import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';
import { HandlerService } from './error-handler.service';

import { DescriptionLengthPipe } from './shared/string-length.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AcessoComponent,
    LoginComponent,
    CadastroComponent,
    EventosComponent,
    TopoComponent,
    DescriptionLengthPipe
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    ToastModule.forRoot()
  ],
  providers: [AuthService, AuthGuard, HandlerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
