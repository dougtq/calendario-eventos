import { ErrorHandler, Injectable, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { UNAUTHORIZED, BAD_REQUEST, FORBIDDEN } from 'http-status-codes';
import { ToastsManager, Toast, ToastOptions } from 'ng2-toastr';

import { AuthService } from './auth.service';

@Injectable()
export class HandlerService implements ErrorHandler {
  constructor(private router: Router, private toastManager: ToastsManager) {}

  static readonly REFRESH_PAGE_ON_TOAST_CLICK_MESSAGE: string = 'Ocorreu um erro!';
  static readonly DEFAULT_ERROR_TITLE: string = 'Algo aconteceu!';

  public handleError(error: any) {
    const message = (error.data) ? error.data.message : '';
    const httpErrorCode = error.status;
    switch (httpErrorCode) {
      case UNAUTHORIZED:
        this.showError(message);
        this.router.navigateByUrl('/');
        break;
      case FORBIDDEN:
        this.showError(message);
        this.router.navigateByUrl('/');
        break;
      case BAD_REQUEST:
        this.showError(message);
        break;
      default:
        this.showError(message);
    }
  }

  private showError(message: string) {
    this.toastManager.error(message, HandlerService.DEFAULT_ERROR_TITLE, { toastLife: 5000, dismiss: 'click', showCloseButton: true });
  }

  public showUserError(message: string, title: string) {
    this.toastManager.error(message, title, { toastLife: 5000, dismiss: 'click', showCloseButton: true });
  }
}
