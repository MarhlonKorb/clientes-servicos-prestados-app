import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/clientes.service';
import { Cliente } from '../models/cliente';
import { Router } from '@angular/router';
@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.css'],
})
export class ClientesListaComponent implements OnInit {
  clientes: Cliente[] = [];
  clienteSelecionado: Cliente;
  mensagemSucesso: string;
  mensagemErro: string;
  constructor(private service: ClientesService, private router: Router) {}

  ngOnInit(): void {
    this.service
      .getClientes()
      .subscribe((resposta) => (this.clientes = resposta));
  }

  public novoCadastro() {
    this.router.navigate(['/clientes-form']);
  }

  preparaDelecao(cliente: Cliente) {
    this.clienteSelecionado = cliente;
  }

  deletarCliente() {
    this.service.excluirCliente(this.clienteSelecionado).subscribe(
       response =>{ this.mensagemSucesso = 'Cliente excluído com sucesso!', this.ngOnInit();
    },
    erro => this.mensagemErro = 'Ocorreu um erro ao excluir o cliente'
       )
  }
}
