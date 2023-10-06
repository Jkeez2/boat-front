import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./user/login/login.component";
import {RegistrationComponent} from "./user/registration/registration.component";
import {BoatListComponent} from "./boat/boat-list/boat-list.component";
import {authGuard} from "./guards/auth.guard";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'boat-list', component: BoatListComponent, canActivate: [authGuard] },
  { path: '',   redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
