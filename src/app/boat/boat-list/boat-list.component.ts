import {Component, ViewChild} from '@angular/core';
import {User} from "../../user/user.model";
import {UserService} from "../../user/user.service";
import {Boat} from "../boat.model";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {DeleteDialogComponent} from "../delete-dialog/delete-dialog.component";
import {Router} from "@angular/router";

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

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UserService, private dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    let userId = localStorage.getItem('currentUser');
    this.userService.getCurrentUser(Number(userId)).subscribe((user) => {
      this.currentUser = user;
      this.getBoats(user.id);
    });
  }

  getBoats(userId: number): void {
    this.userService.getBoats(userId)
      .subscribe(boats => {
        this.boats = boats;
        this.dataSource = new MatTableDataSource(this.boats);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(boatId: number, boatName: string): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {id: boatId, boatName: boatName},
    });
    console.log(this.currentUser)
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteBoat(Number(this.currentUser?.id), boatId).subscribe((boats) => {
          this.boats = boats;
          this.dataSource = new MatTableDataSource(boats);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      }
    });
  }
}
