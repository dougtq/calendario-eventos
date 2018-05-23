import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../../auth.service';
import { HandlerService } from '../../error-handler.service';
import { Usuario } from '../../shared/usuario.model';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {
  @Output() public cadastro = new EventEmitter<string>();
  public usuario: Usuario;
  public loading = false;
  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null, [Validators.required, Validators.maxLength(80), Validators.email]),
    'name': new FormControl(null, [Validators.required]),
    'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
    'password_confirmation': new FormControl(null, [Validators.required, Validators.minLength(6)])
  });
  constructor(private authService: AuthService, private handler: HandlerService) { }

  ngOnInit() {}

  public alteraComponente(): void {
    this.cadastro.emit('login');
  }

  async cadastrarUsuario() {
    if (this.formulario.valid) {
      if (this.formulario.value.password === this.formulario.value.password_confirmation) {
        this.loading = true;
        this.usuario = new Usuario(
          this.formulario.value.email,
          this.formulario.value.name,
          this.formulario.value.password);

        this.authService.cadastrarUsuario(this.usuario);
      } else {
        this.handler.showUserError('As senhas digitadas não se correspondem!', 'Erro no cadastro...');
      }
    }
    this.loading = false;
  }
}
