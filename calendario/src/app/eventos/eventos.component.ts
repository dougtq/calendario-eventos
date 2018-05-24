import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

import { EventosService } from './eventos.service';
import { Evento } from '../shared/evento.model';
import { HandlerService } from '../error-handler.service';


@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
  providers: [EventosService]
})
export class EventosComponent implements OnInit {
  public formulario: FormGroup = new FormGroup({
    'name': new FormControl(null, [Validators.required, Validators.minLength(3)]),
    'initialDate': new FormControl(null, [Validators.required]),
    'initialTime': new FormControl(null, [Validators.required]),
    'finalDate': new FormControl(null, [Validators.required]),
    'finalTime': new FormControl(null, [Validators.required])
  });

  public eventos: Array<Evento> = [];
  public eventoUsuario: Evento;
  public acao: string;
  public carregando = false;
  public sobrescreveEvento = false;

  constructor(private eventosService: EventosService, private handler: HandlerService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getEventos();
  }

  private zeraCamposDatas(nomeEvento: string): void {
    if (!confirm(`Você já possui o evento ${nomeEvento} ocorrendo no mesmo período, deseja continuar?`)) {
      this.formulario.controls['initialDate'].setValue(null);
      this.formulario.controls['initialTime'].setValue(null);
      this.formulario.controls['finalDate'].setValue(null);
      this.formulario.controls['finalTime'].setValue(null);
    }
  }

  public verificaDataEventos(): void {
    const novaDataInicial = Date.parse(this.formulario.value.initialDate + ' ' + this.formulario.value.initialTime);
    const novaDataFinal = Date.parse(this.formulario.value.finalDate + ' ' + this.formulario.value.finalTime);

    this.eventos.find((ev, i, array) => {
      const dataInicialExistente = Date.parse(ev.initialDate +  ' ' + ev.initialTime);
      const dataFinalExistente = Date.parse(ev.finalDate +  ' ' + ev.finalTime);
      if (novaDataInicial <= dataInicialExistente && novaDataFinal >= dataFinalExistente) {
        if (this.acao === 'edicao' && ev._id !== this.eventoUsuario._id) {
          this.zeraCamposDatas(ev.name);
          return true;
        } else if (this.acao === 'criacao') {
          this.zeraCamposDatas(ev.name);
          return true;
        }
      } else if (novaDataInicial >= dataInicialExistente && novaDataInicial <= dataFinalExistente) {
        if (this.acao === 'edicao' && ev._id !== this.eventoUsuario._id) {
          this.zeraCamposDatas(ev.name);
          return true;
        } else if (this.acao === 'criacao') {
          this.zeraCamposDatas(ev.name);
          return true;
        }
      } else if (novaDataFinal >= dataInicialExistente && novaDataFinal <= dataFinalExistente) {
        if (this.acao === 'edicao' && ev._id !== this.eventoUsuario._id) {
          this.zeraCamposDatas(ev.name);
          return true;
        } else if (this.acao === 'criacao') {
          this.zeraCamposDatas(ev.name);
          return true;
        }
      }
    });
  }

  public formataData(data: string, hora: string): string {
    return moment(data + ' ' + hora).format('DD/MM/YYYY H:mm');
  }

  private validacao(): boolean {
    const iniData = Date.parse(this.formulario.value.initialDate + ' ' + this.formulario.value.initialTime);
    const fimData = Date.parse(this.formulario.value.finalDate + ' ' + this.formulario.value.finalTime);

    if (iniData > fimData) {
      this.handler.showUserError('A data inicial do evento não pode ser posterior a data final...', 'Temos um problema!');
      return false;
    }

    return true;
  }

  public limpaForm(): void {
    this.formulario.reset();
  }

  public abreModalCriacao(e, modal): void {
    this.limpaForm();
    this.acao = 'criacao';
    this.modalService.open(modal, { centered: true });
  }

  public abreModalEdicao(e, modal): void {
    this.acao = 'edicao';
    this.modalService
      .open(modal, { centered: true });

    this.eventos.find((item: Evento, index: number): boolean => {
      if (item._id === e.target.id) {
        this.eventoUsuario = item;
        this.formulario.controls['name'].setValue(this.eventoUsuario.name);
        this.formulario.controls['initialDate'].setValue(this.eventoUsuario.initialDate);
        this.formulario.controls['initialTime'].setValue(this.eventoUsuario.initialTime);
        this.formulario.controls['finalDate'].setValue(this.eventoUsuario.finalDate);
        this.formulario.controls['finalTime'].setValue(this.eventoUsuario.finalTime);

        return true;
      }
    });
  }

  public abreModalExclusao(e, modal): void {
    this.eventos.find((item: Evento, index: number): boolean => {
      if (item._id === e.target.id) {
        this.eventoUsuario = item;
        return true;
      }
    });
    this.modalService
    .open(modal, { centered: true });
  }

  public executaFuncao(closeModal): void {
    if (this.formulario.valid || this.validacao()) {
      this.verificaDataEventos();
      if (this.acao === 'criacao') {
        this.addEvento(closeModal);
      } else if (this.acao === 'edicao') {
        this.editaEvento(closeModal);
      }
    } else {
      this.handler.showUserError('Os campos estão incompletos', 'Temos um problema!');
    }
  }

  public getEventos(): void {
    this.eventosService.getEventos().then((ev) => this.eventos = ev);
  }

  public async addEvento(closeModal): Promise<void> {
    if (this.formulario.valid && this.validacao()) {
      const { value } = this.formulario;
      const evento: Evento = {
        name: value.name,
        initialDate: value.initialDate,
        initialTime: value.initialTime,
        finalDate: value.finalDate,
        finalTime: value.finalTime,
        author: ''
      };

      try {
        const novoEvento = await this.eventosService.addEvento(evento);
        this.eventos = [novoEvento, ...this.eventos];
        this.sobrescreveEvento = false;
        this.getEventos();
        closeModal();
      } catch (err) {
        if (err.data) {
          this.handler.showUserError(err.data.message, 'Temos um problema!');
        } else {
          this.handler.showUserError('Não foi possível adicionar o evento', 'Temos um problema!');
        }
      }
    }

  }

  public async deletaEvento(closeModal): Promise<void> {
    try {
      await this.eventosService.deletaEvento(this.eventoUsuario._id);
      const eventoIndex = this.eventos.indexOf(this.eventoUsuario);

      this.eventos.splice(eventoIndex, 1);
      closeModal();
      this.getEventos();
    } catch (err) {
      if (err.data) {
        this.handler.showUserError(err.data.message, 'Temos um problema!');
      } else {
        this.handler.showUserError('Não foi possível adicionar o evento', 'Temos um problema!');
      }
      closeModal();
    }
  }

  public async editaEvento(closeModal): Promise<void> {
    try {
      if (this.formulario.valid && this.validacao()) {
        const { value } = this.formulario;
        const evento: Evento = {
          _id: this.eventoUsuario._id,
          name: value.name,
          initialDate: value.initialDate,
          initialTime: value.initialTime,
          finalDate: value.finalDate,
          finalTime: value.finalTime,
          author: this.eventoUsuario.author
        };
        const eventoEditado: Evento = await this.eventosService.editaEvento(evento);
        const eventoIndex = this.eventos.indexOf(this.eventoUsuario);
        this.eventos[eventoIndex] = eventoEditado;
        this.getEventos();
        this.sobrescreveEvento = false;
        closeModal();
      }
    } catch (err) {
      if (err.data) {
        this.handler.showUserError(err.data.message, 'Temos um problema!');
      } else {
        this.handler.showUserError('Não foi possível adicionar o evento', 'Temos um problema!');
      }
      closeModal();
    }
  }
}
