import { Component } from '@angular/core';
import {UserService} from "../../user/user.service";
import {ActivatedRoute} from "@angular/router";
import {Boat} from "../boat.model";

/**
 * This component simply display a boat's details using a mat-card.
 * It currently not handles bad request with wrong boat id (ex. string value or non-existing id).
 */
@Component({
  selector: 'app-boat-details',
  templateUrl: './boat-details.component.html',
  styleUrls: ['./boat-details.component.css']
})
export class BoatDetailsComponent {
  boat: Boat;
  constructor(private route: ActivatedRoute, private userService: UserService) {
  }

  /**
   * Initialise component by fetching boat
   */
  ngOnInit() {
    let userId = Number(localStorage.getItem('currentUser'));
    let boatId = this.route.snapshot.paramMap.get('boatId');

    this.userService.getBoat(userId, Number(boatId))
      .subscribe((boat) => {
      this.boat = boat;
    });
  }
}
