import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
/** Aqui devem ser realizados os importas dos arquivos do componente */
import { HomeComponent } from './home/home.component';

/** Aqui é possível designar as rotas dos componentes da aplicação */
const routes: Routes = [{ path: 'home', component: HomeComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
