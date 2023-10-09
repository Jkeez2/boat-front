import {Component, ViewChild} from '@angular/core';
import {User} from "../../user/models/user.model";
import {UserService} from "../../user/user.service";
import {Boat} from "../models/boat.model";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {DeleteDialogComponent} from "../delete-dialog/delete-dialog.component";
import {Router} from "@angular/router";

/**
 * This component display a table containing user's boats.
 * User can make a simple search based on a boat name.
 * User can see, edit or delete each row.
 * Finally, user can add a new boat.
 */
@Component({
  selector: 'app-boat-list',
  templateUrl: './boat-list.component.html',
  styleUrls: ['./boat-list.component.css']
})
export class BoatListComponent {
  currentUser: User | null = null;
  boats: Boat[] = [];

  displayedColumns: string[] = ['id', 'name', 'actions'];
  dataSource: MatTableDataSource<Boat>;

  // Used for sorting and pagination of the table
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UserService, private dialog: MatDialog, private router: Router) { }

  /**
   * On component init, we fetch the current user's boats
   */
  ngOnInit() {
    let userId = localStorage.getItem('currentUser');
    this.userService.getCurrentUser(Number(userId)).subscribe((user) => {
      this.currentUser = user;
      this.getBoats(user.id);
    });
  }

  /**
   * Method that subscribes to the observable that will fetch boats.
   * @param userId current user's id
   */
  getBoats(userId: number): void {
    this.userService.getBoats(userId)
      .subscribe(boats => {
        this.boats = boats;
        // Initialize the table
        this.dataSource = new MatTableDataSource(this.boats);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  /**
   * This is the array filtering method.
   * @param event the search event
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * This method is called when the user wants to delete a boat.
   * It uses the DeleteDialogComponent, to confirm deletion.
   * @param boatId boat id to delete
   * @param boatName boat name to delete
   */
  openDialog(boatId: number, boatName: string): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {id: boatId, boatName: boatName},
    });

    // If user choose to delete, we subscribe to the service for deletion
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteBoat(Number(this.currentUser?.id), boatId).subscribe((boats) => {
          // I decided to return the updated list by the API when I call a DELETE,
          // so I don't have to make a call to fetch it
          this.boats = boats;
          this.dataSource = new MatTableDataSource(boats);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      }
    });
  }
}
