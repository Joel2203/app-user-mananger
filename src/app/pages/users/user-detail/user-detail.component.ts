import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UserResponse } from 'src/app/models/user-response';
import { UserService } from 'src/app/services/user.service';
import { DialogDeleteUserComponent } from '../dialog-delete-user/dialog-delete-user.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  title = 'Detalles de Usuario';
  currentUser!: UserResponse;
  today = new Date();

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.currentUser = {
      id: '',
      name: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      birthdate: this.today,
      creationDate: this.today,
      modificationDate: this.today,
    };

    const userId: string = this.route.snapshot.paramMap.get('id') ?? '';
    this.userService.getUserById(userId).subscribe({
      next: (response) => {
        this.currentUser = response;
      },
    });
  }

  onDelete(): void {
    this.dialog.open(DialogDeleteUserComponent, {
      data: this.currentUser,
    });
  }
}
