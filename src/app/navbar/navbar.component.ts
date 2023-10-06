import { Component } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {UserService} from "../user/user.service";
import {User} from "../user/user.model";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  currentUser: User | null;
  constructor(private auth: AuthService, private userService: UserService) {}

  isAuthenticated(){
    if (this.auth.isAunthenticated()) {
      this.setAuthenticatedUser();
      return true;
    }
    return false;
  }

  setAuthenticatedUser() {
    let userId = localStorage.getItem('currentUser');
    if (!this.currentUser) {
      this.userService.getCurrentUser(Number(userId)).subscribe((user) => {
        this.currentUser = user;
      });
    }
  }

  logout() {
    this.auth.logout();
    this.currentUser = null;
  }
}
