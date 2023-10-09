import { Component } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {UserService} from "../user/user.service";
import {User} from "../user/user.model";
import {first, share, shareReplay, take, takeUntil, takeWhile} from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  currentUser: User | null;
  constructor(private auth: AuthService, private userService: UserService) {}

  isAuthenticated(){
    return this.auth.isAuthenticated();

  }

  logout() {
    this.auth.logout();
    this.currentUser = null;
  }
}
