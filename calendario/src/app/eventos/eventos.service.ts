import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { HandlerService } from '../error-handler.service';
import { AuthService } from '../auth.service';
import { Evento } from '../shared/evento.model';

@Injectable()
export class EventosService {

  constructor(private router: Router, private handler: HandlerService, private http: Http, private auth: AuthService) {}

  private setAuthorization(header: Headers): Headers {
    const token = this.auth.getStorageKey('tokenId');
    header.append('authorization', token);
    return header;
  }

  public getEventos(): Promise<Array<Evento>> {
    const author = this.auth.getStorageKey('_id');
    let header = new Headers();
    header = this.setAuthorization(header);
    return this.http.get(environment.apiUrl + '/events/author/' + author, { headers: header })
      .toPromise()
      .then((res: Response) => res.json())
      .then((eventos) => eventos.data)
      .catch((err) => this.handler.handleError(err.json()))
      .catch((err) => this.handler.showUserError('Não foi possível recuperar sua lista de eventos', 'Temos um problema...'));
  }

  public addEvento(evento: Evento): any {
    return new Promise((resolve, reject) => {
      let header = new Headers();
      evento.author = this.auth.getStorageKey('_id');

      header = this.setAuthorization(header);

      this.http.post(environment.apiUrl + '/events', evento, { headers: header })
        .toPromise()
        .then((res: Response) => res.json())
        .then((newEvent) => {
          resolve(newEvent.data);
        })
        .catch((err) => {
          reject(err.json());
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  public editaEvento(evento: Evento): any {
    return new Promise((resolve, reject) => {
      let header = new Headers();
      evento.author = this.auth.getStorageKey('_id');
      header = this.setAuthorization(header);

      this.http.put(environment.apiUrl + '/events/' + evento._id + '/author/' + evento.author, evento, { headers: header })
        .toPromise()
        .then((res: Response) => res.json())
        .then((newEvent) => resolve(newEvent.data))
        .catch((err) => reject(err.json()))
        .catch((err) => reject(err));
    });
  }

  public deletaEvento(eventoId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let header = new Headers();
      const author = this.auth.getStorageKey('_id');
      header = this.setAuthorization(header);

      this.http.delete(environment.apiUrl + '/events/' + eventoId + '/author/' + author, { headers: header })
        .toPromise()
        .then((res) => res.json())
        .then((data) => resolve(data))
        .catch((err) => reject(err.json()))
        .catch((err) => reject(err));
    });
  }

}
