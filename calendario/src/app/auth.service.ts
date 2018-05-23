import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';

import { Login } from './shared/login.model';
import { HandlerService } from './error-handler.service';
import { Usuario } from './shared/usuario.model';
import { environment } from '../environments/environment';

@Injectable()
export class AuthService {
  public tokenId: string;
  public email: string;
  public _id: string;
  public name: string;

  constructor(private router: Router, private handler: HandlerService, private http: Http) {}

  public cadastrarUsuario(usuario: Usuario): void {
    const { email, name, password } = usuario;
    this.http.post(environment.apiUrl + '/users', { name, email, password })
    .toPromise()
    .then((res: Response) => {
      this.tokenId = res.headers.toJSON().authorization;
      return res.json();
    })
    .then((res: any): void => {
      const { data } = res;
      this.email = data.email;
      this._id = data._id;
      this.name = data.name;

      this.setTokenStorage();
      this.router.navigateByUrl('/eventos');
    })
    .catch((err) => {
      this.removeTokenStorage();
      this.handler.handleError(err.json());
    })
    .catch((err) => {
      this.handler.handleError(err);
    });
  }

  public logarUsuario(usuario: Login): void {
    const { email, password } = usuario;
    this.http.post(environment.apiUrl + '/users/session', { email, password })
      .toPromise()
      .then((res: Response) => {
        this.tokenId = res.headers.toJSON().authorization;
        return res.json();
      })
      .then((res: any): void => {
        const user: Usuario = res.data.user;
        this.email = user.email;
        this._id = user._id;
        this.name = user.name;
        this.removeTokenStorage();
        this.setTokenStorage();
        this.router.navigateByUrl('/eventos');
      })
      .catch((err) => {
        this.removeTokenStorage();
        this.handler.handleError(err.json());
      });
  }

  public logOut(): void {
    this.tokenId = undefined;
    this.email = undefined;
    this.name = undefined;
    this._id = undefined;

    this.removeTokenStorage();
    this.router.navigateByUrl('/');
  }

  public statusAutenticacao(): boolean {
    if (!this.getTokenStorage()) {
      this.router.navigateByUrl('/');
    }
    return !!this.getTokenStorage();
  }

  private setTokenStorage(): void {
    sessionStorage.setItem('tokenId', this.tokenId);
    sessionStorage.setItem('email', this.email);
    sessionStorage.setItem('_id', this._id);
    sessionStorage.setItem('name', this.name);
  }

  private getTokenStorage(): string {
    return sessionStorage.getItem('tokenId');
  }

  public getStorageKey(key: string): string {
    return this[key] || sessionStorage.getItem(key);
  }

  private removeTokenStorage(): void {
    return sessionStorage.clear();
  }
}
