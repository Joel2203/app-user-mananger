import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserResponse } from 'src/app/models/user-response';
import { UserService } from 'src/app/services/user.service';
import { DialogDeleteUserComponent } from '../dialog-delete-user/dialog-delete-user.component';

@Component({
  selector: 'app-users-grid',
  templateUrl: './users-grid.component.html',
  styleUrls: ['./users-grid.component.scss'],
})
export class UsersGridComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  users: UserResponse[] = [];
  displayedColumns: string[] = [
    'name',
    'lastName',
    'email',
    'phone',
    'creationDate',
    'modificationDate',
    'actions',
  ];
  dataSource!: MatTableDataSource<UserResponse>;
  title = 'Usuarios';

  constructor(private userService: UserService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe({
      next: (response) => {
        this.users = response;
        this.dataSource = new MatTableDataSource<UserResponse>(this.users);
        this.paginator.length = this.users.length;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
    });
  }

  onDelete(user: UserResponse): void {
    const dialogRef = this.dialog.open(DialogDeleteUserComponent, {
      data: user,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loadUsers();
    });
  }
}
