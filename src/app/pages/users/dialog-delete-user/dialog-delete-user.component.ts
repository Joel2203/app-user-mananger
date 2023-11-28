import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserResponse } from 'src/app/models/user-response';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dialog-delete-user',
  templateUrl: './dialog-delete-user.component.html',
  styleUrls: ['./dialog-delete-user.component.scss'],
})
export class DialogDeleteUserComponent implements OnInit {
  currentUser!: UserResponse;

  constructor(
    public dialogRef: MatDialogRef<DialogDeleteUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserResponse,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.data;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDelete() {
    this.userService.deleteUser(this.currentUser.id).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/users');
      },
    });
  }
}
