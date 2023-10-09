import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BoatDelete} from "../models/boat-delete.model";

/**
 * This component represents the modal dialog, to confirm boat's deletion
 */
@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent {

  // We inject boat's data
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BoatDelete,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
