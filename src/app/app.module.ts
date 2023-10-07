import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {UserModule} from "./user/user.module";
import {BoatModule} from "./boat/boat.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NavbarComponent} from "./navbar/navbar.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import { FullnamePipe } from './shared/pipes/fullname/fullname.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FullnamePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    UserModule,
    BoatModule,
    MatToolbarModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
