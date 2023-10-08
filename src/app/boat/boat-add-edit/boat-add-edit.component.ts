import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {UserService} from "../../user/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Boat} from "../boat.model";
import {UserActions} from "../../shared/enums/user-actions"

/**
 * Component that contains a single form for creation and update of a boat, using reactive form.
 * To distinguish the two operations, we check if the route contains a boat id (Update) or not (Create).
 */
@Component({
  selector: 'app-boat-add-edit',
  templateUrl: './boat-add-edit.component.html',
  styleUrls: ['./boat-add-edit.component.css']
})
export class BoatAddEditComponent {

  // Contains the action (Update or Create)
  userAction : string | undefined = undefined;
  boatForm = this.fb.group({
    name: ['', Validators.required],
    description: ['']
  });

  // The property that we use to submit data
  boatToSubmit: Boat = {id: 0, name: '', description: ''};

  userId: number;
  boatId: number;

  constructor(private userService: UserService, private router: Router, private fb: FormBuilder, private route :ActivatedRoute) {
  }

  /**
   * On init, we check if the route contains a boat id to fill in the form with its value.
   */
  ngOnInit() {
    // We get authenticated user id
    this.userId = Number(localStorage.getItem('currentUser'));
    let boatId = this.route.snapshot.paramMap.get('boatId');

    if (boatId) {
      this.userAction = UserActions.Update;
      this.userService.getBoat(this.userId, Number(boatId)).subscribe((boatToUpdate) => {
        this.boatForm.get("name")?.setValue(boatToUpdate.name);
        this.boatForm.get("description")?.setValue(boatToUpdate.description);
        this.boatId = Number(boatId);
      });
    } else {
      this.userAction = UserActions.Create;
    }
  }

  /**
   * Submit a boat for and update or a creation.
   */
  submit() {
    // Retrieve form values to build a boat object
    this.boatToSubmit = Object.assign(this.boatToSubmit, this.boatForm.value);
    this.boatToSubmit.userAccountId = Number(this.userId);

    if (UserActions.Create === this.userAction) {
      this.userService.addBoat(Number(this.userId), this.boatToSubmit).subscribe(() => {
        this.router.navigate(['/boats']);
      });
    } else if (UserActions.Update === this.userAction) {
      this.userService.updateBoat(Number(this.userId), this.boatId, this.boatToSubmit).subscribe(() => {
        this.router.navigate(['/boats']);
      });
    }
  }
}
