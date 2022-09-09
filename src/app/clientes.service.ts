import { Injectable } from '@angular/core';
import { Cliente } from './clientes/models/cliente';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {

apiURL: string = environment.apiURLBase + '/api/clientes';

  /**Injetar uma dependência na classe basta inserir
   *  o módulo importado do service dentro do construtor da classe */
  constructor(private http: HttpClient) {}

  public salvar(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(
      `${this.apiURL}`,
      cliente
    );
  }

  public atualizar(cliente: Cliente): Observable<any> {
    return this.http.put<Cliente>(
     `${this.apiURL}/${cliente.id}`,
      cliente
    );
  }

  public getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiURL);
  }

  public getClienteById(id: number): Observable<Cliente>{
   return this.http.get<any>(`${this.apiURL}/${id}`);
  }

  public excluirCliente(cliente: Cliente): Observable<any>{
    return this.http.delete<any>(`${this.apiURL}/${cliente.id}`);
  }
}
