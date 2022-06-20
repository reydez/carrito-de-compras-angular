import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClienteService } from './cliente.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private clienteService: ClienteService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.clienteService.getToken();
    const authRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + authToken)
    });
    return next.handle(authRequest);
  }
}


