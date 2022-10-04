import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Usuario } from './login/usuario';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})

/**
 * Classe responsável pela autenticação de login e usuário
 */
export class AuthService {
  apiURL: string = environment.apiURLBase + '/api/usuarios';
  tokenUrl: string = environment.apiURLBase + environment.obterTokenUrl;
  clientId: string = environment.clientId;
  clientSecret: string = environment.clientSecret;
  // Classe responsável pela verificação do tempo de expiração do token
  jwtHelper: JwtHelperService = new JwtHelperService();
  constructor(private http: HttpClient) {}

  /**
   * Obtem token do local storage
   * @returns void
   */
  obterToken() {
    const tokenString = localStorage.getItem('access_token');
    if (tokenString) {
      const token = JSON.parse(tokenString).access_token;
      return token;
    }
    return null;
  }

  /**
   * Remove token do local storage e finaliza a sessão
   */
finalizarSessao(){
  localStorage.removeItem('access_token');
}

getUsuarioAutenticado(){
  const token = this.obterToken();
  if(token){
    // Decodifica o token e pega a propriedade `user_name`
    const usuario = this.jwtHelper.decodeToken(token).user_name;
    return usuario;
  }
  return null;
}

  /**
   * Implementa a autenticação para o acesso as rotas da aplicação
   * @returns boolean
   */
  isAuthenticated(): boolean {
    const token = this.obterToken();
    if(token){
      const expired = this.jwtHelper.isTokenExpired(token);
      return !expired;
    }
    return false;
  }

  public salvar(usuario: Usuario): Observable<any> {
    return this.http.post<any>(this.apiURL, usuario);
  }

  /**
   * Método responsável por decodificar token de autenticação
   * e enviar dados de autenticação para o backend
   * @param username
   * @param password
   * @returns Observable<any>
   */
  public tentarLogar(username: string, password: string): Observable<any> {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('grant_type', 'password');
    //Decodificar URL para ser enviado para o backend
    const headers = {
      Authorization: 'Basic ' + btoa(`${this.clientId}:${this.clientSecret}`),
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    return this.http.post(this.tokenUrl, params.toString(), {
      headers: headers,
    });
  }
}
