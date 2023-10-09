import { Component } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {User} from "../user/models/user.model";

/**
 * This is the App's navbar, which checks for authentication in order to display login,
 * register and logout buttons when necessary.
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  currentUser: User | null;
  constructor(private auth: AuthService) {}

  /**
   * This method checks if user is authenticated.
   */
  isAuthenticated(){
    return this.auth.isAuthenticated();

  }

  /**
   * Call the logout method.
   */
  logout() {
    this.auth.logout();
    this.currentUser = null;
  }
}
