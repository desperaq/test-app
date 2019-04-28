import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { LoginService } from './services/login.service';
import { CardManageService } from './services/card-manage.service';

import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { BoardComponent } from './user/board/board.component';
import { CardComponent } from './user/card/card.component';
import { ListComponent } from './user/list/list.component';
import { WebSocketService } from './services/ws.service';
import { CardService } from './user/card/card.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { OrderBy } from './pipes/orderBy.pipe';
import { BoardService } from './user/board/board.service';
import { ListService } from './user/list/list.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    RegisterComponent,
    DashboardComponent,
    BoardComponent,
    CardComponent,
    ListComponent,
    OrderBy
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [LoginService, CardManageService, WebSocketService, CardService, BoardService, ListService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
