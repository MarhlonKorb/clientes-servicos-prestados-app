import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './usuario';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string;
  password: string;
  cadastrando: boolean;
  mensagemSucesso: string;
  errors : String[];

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit() {
    this.authService.tentarLogar(this.username, this.password).subscribe(
      response => {
        this.router.navigate(['/home']);
      }, errorResponse =>{
        this.mensagemSucesso = null;
        this.errors = ['Usuário e/ou senha incorreto(s).']
      }
    )
  }

  preparaCadastrar(event) {
    this.errors = null;
    event.preventDefault();
    this.cadastrando = true;
  }

  cancelarCadastro() {
    this.errors = null;
    this.cadastrando = false;
  }

  cadastrarUsuario() {
    const usuario: Usuario = new Usuario();
    usuario.username = this.username;
    usuario.password = this.password;
    this.authService.salvar(usuario).subscribe(
      (response) => {
        this.mensagemSucesso =
          'Cadastro realizado com sucesso! Efetue o login.';
          this.cadastrando = false;
          this.username = '';
          this.password ='';
          this.errors = [];
      },
      errorResponse => {
        this.mensagemSucesso = null;
        this.errors = errorResponse.error.errors;
      }
    );
  }
}
