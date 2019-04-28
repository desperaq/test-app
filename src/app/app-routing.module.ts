import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { CardComponent } from './user/card/card.component';
import { BoardComponent } from './user/board/board.component';
import { AuthGuard } from './login/auth.guard';
import { ListComponent } from './user/list/list.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'header', component: HeaderComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'card', component: CardComponent},
  {path: 'board', component: BoardComponent},
  {path: 'list', component: ListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


 }
