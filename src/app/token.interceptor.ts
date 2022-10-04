import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Classe que intercepta as requisições e valida os tokens
 */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Retorna a chave do token armazenada no local storage
    const tokenString = localStorage.getItem('access_token');

    const url = request.url;
    // Executa apenas se não estiver tentando obter o token
    // Estava dando erro de login
    if (tokenString && !url.endsWith('/oauth/token')) {
      // Converte o token para um objeto do tipo JSON novamente
      const token = JSON.parse(tokenString);
      const jwt = token.access_token;
      // Cópia da request
      request = request.clone({
        setHeaders : {
          Authorization: 'Bearer ' + jwt,
        },
      });
    }
    return next.handle(request);
  }
}
