import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./user/login/login.component";
import {RegistrationComponent} from "./user/registration/registration.component";
import {BoatListComponent} from "./boat/boat-list/boat-list.component";
import {authGuard} from "./guards/auth.guard";
import {BoatAddEditComponent} from "./boat/boat-add-edit/boat-add-edit.component";
import {BoatsComponent} from "./boat/boats/boats.component";
import {BoatDetailsComponent} from "./boat/boat-details/boat-details.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'boats', component: BoatsComponent, canActivate: [authGuard],
  children: [
    { path: 'list', component: BoatListComponent },
    { path: 'add', component: BoatAddEditComponent },
    { path: 'edit/:boatId', component: BoatAddEditComponent },
    { path: 'details/:boatId', component: BoatDetailsComponent },
    { path: '',   redirectTo: 'list', pathMatch: 'full' },
  ]},
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: '**',   redirectTo: '/boats/list' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
