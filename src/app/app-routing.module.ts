import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
/** Aqui devem ser realizados os importes dos arquivos do componente */
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './auth.guard';

/** Aqui é possível designar as rotas dos componentes da aplicação */
const routes: Routes = [
  { path: 'login', component: LoginComponent},

  {
    path: '',
    component: LayoutComponent,
    // Para que o usuário possa acessar a rota home, é preciso que AuthGuard retorne true
    children: [{ path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: '/home', pathMatch: 'full'}
  ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
