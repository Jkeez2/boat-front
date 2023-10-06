import { Component } from '@angular/core';
import {User} from "../../user/user.model";
import {UserService} from "../../user/user.service";

@Component({
  selector: 'app-boat-list',
  templateUrl: './boat-list.component.html',
  styleUrls: ['./boat-list.component.css']
})
export class BoatListComponent {
  currentUser: User | null = null;

  constructor(private userService: UserService) { }

  ngOnInit() {
    let userId = localStorage.getItem('currentUser');
    this.userService.getCurrentUser(Number(userId)).subscribe((user) => {
      this.currentUser = user;
    });
  }
}
