import { Injectable } from '@angular/core';
import { Cliente } from './clientes/cliente';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  /**Injetar uma dependência na classe basta inserir
   *  o módulo importado do service dentro do construtor da classe */
  constructor(private http: HttpClient) {}

  getCliente(): Cliente {
    let cliente: Cliente = new Cliente();
    cliente.nome = 'Teste';
    cliente.cpf = '03187153097';
    return cliente;
  }
}
