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

  constructor(private service: ClientesService,
    private router: Router) {}

  ngOnInit(): void {
    this.service
      .getClientes()
      .subscribe((resposta) => (this.clientes = resposta));
  }

  public novoCadastro(){
    this.router.navigate(['/clientes-form'])
  }
}
