import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css'],
})
export class ClientesFormComponent implements OnInit {
  cliente: Cliente;

<<<<<<< Updated upstream
  constructor() { }
=======
  constructor() {
    this.cliente = new Cliente();
  }

  ngOnInit(): void {}
>>>>>>> Stashed changes

  onSubmit() {
    console.log(this.cliente);
  }
}
