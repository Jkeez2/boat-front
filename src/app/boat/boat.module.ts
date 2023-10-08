import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoatListComponent } from './boat-list/boat-list.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {RouterLink, RouterOutlet} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatIconModule} from "@angular/material/icon";
import { BoatAddEditComponent } from './boat-add-edit/boat-add-edit.component';
import { BoatsComponent } from './boats/boats.component';
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {ReactiveFormsModule} from "@angular/forms";
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import { BoatDetailsComponent } from './boat-details/boat-details.component';



@NgModule({
  declarations: [
    BoatListComponent,
    BoatAddEditComponent,
    BoatsComponent,
    DeleteDialogComponent,
    BoatDetailsComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    RouterLink,
    MatButtonModule,
    MatTooltipModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    RouterOutlet,
    MatCardModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatDialogModule
  ]
})
export class BoatModule { }
