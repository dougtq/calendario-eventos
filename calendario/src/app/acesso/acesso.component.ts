import { Component, OnInit, trigger, state, transition, style, animate, keyframes } from '@angular/core';

@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.component.html',
  styleUrls: ['./acesso.component.scss'],
  animations: [
  trigger('anima-user', [
    state('criado', style({ opacity: 1 })),
    transition('void -> criado',
      [
        style({ opacity: 0, transform: 'translate(90px, 0)'}),
        animate('1.5s 0s ease-in-out')
      ]
    )
  ])
  ]
})
export class AcessoComponent implements OnInit {
  public estadoBanner = 'criado';
  public estadoUser = 'criado';
  public cadastro = false;
  constructor() { }

  ngOnInit() {
  }

  public recebeCadastro(componentName: string): void {
    this.cadastro = componentName === 'cadastro' ? true : false;
  }
}
