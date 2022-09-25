import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
/** Aqui devem ser realizados os importes dos arquivos do componente */
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';

/** Aqui é possível designar as rotas dos componentes da aplicação */
const routes: Routes = [
  { path: 'login', component: LoginComponent },

  {
    path: '',
    component: LayoutComponent,
    children: [{ path: 'home', component: HomeComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
