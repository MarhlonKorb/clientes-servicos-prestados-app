import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../clientes/models/cliente';
import { ClientesService } from '../../clientes.service';
import { ServicoPrestado } from '../servicoPrestado';
import { ServicoPrestadoService } from '../../servico-prestado.service';

@Component({
  selector: 'app-servico-prestado-form',
  templateUrl: './servico-prestado-form.component.html',
  styleUrls: ['./servico-prestado-form.component.css']
})
export class ServicoPrestadoFormComponent implements OnInit {

  clientes : Cliente[] = [];
  servicoPrestado: ServicoPrestado;

  constructor(
    private clientesService : ClientesService,
    private servicoPrestadoService: ServicoPrestadoService
  ) {
    this.servicoPrestado = new ServicoPrestado();
  }

  ngOnInit(): void {
    this.clientesService.
    getClientes()
    .subscribe( response => this.clientes = response );
  }

  public onSubmit(){
    this.servicoPrestadoService.
    salvar(this.servicoPrestado).
    subscribe( response => {
      console.log(response);
    });
  }
}
