import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CardsModule} from 'ng-uikit-pro-standard';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {LoginComponent} from './login/login.component';
import {AuthRoutingModule} from './auth-routing.module';
import { RegisterComponent } from './register/register.component';
import { UsersComponent } from './users/users.component';



@NgModule({
  declarations: [LoginComponent, RegisterComponent, UsersComponent],
  imports: [
    CommonModule,
    CardsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AuthRoutingModule
  ],
  exports: [
    LoginComponent
  ]
})
export class AuthModule { }
