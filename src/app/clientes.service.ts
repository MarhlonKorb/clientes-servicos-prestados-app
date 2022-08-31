import { Injectable } from '@angular/core';
import { Cliente } from './clientes/models/cliente';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  /**Injetar uma dependência na classe basta inserir
   *  o módulo importado do service dentro do construtor da classe */
  constructor(private http: HttpClient) {}

  public salvar(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(
      'http://localhost:8080/api/clientes',
      cliente
    );
  }

  public getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>('http://localhost:8080/api/clientes');
  }

  /*Conceito de instanciação e retorno de objetos para o front
  getCliente(): Cliente {
    let cliente: Cliente = new Cliente();
    cliente.nome = 'Teste';
    cliente.cpf = '03187153097';
    return cliente;
  }*/
}
