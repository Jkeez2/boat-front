import { Component } from '@angular/core';
import {User} from "../user/models/user.model";
import {UserService} from "../user/user.service";

/**
 * Simple component that loads current user and display a welcome message.
 */
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {

  currentUser: User | null;

  constructor(private userService: UserService) {
  }
  ngOnInit() {
    this.setAuthenticatedUser();
  }

  /**
   * Sets the current user
   */
  setAuthenticatedUser() {
    let userId = localStorage.getItem('currentUser');
    this.userService.getCurrentUser(Number(userId))
      .subscribe((user) => {
        this.currentUser = user;
      });
  }
}
