import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserResponse } from 'src/app/models/user-response';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  title = 'Editar Usuario';
  formUser!: FormGroup;
  today = new Date();
  currentUser!: UserResponse;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formUser = this.formBuilder.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      birthdate: [this.today, [Validators.required]],
    });

    const userId: string = this.route.snapshot.paramMap.get('id') ?? '';
    this.userService.getUserById(userId).subscribe({
      next: (response) => {
        this.currentUser = response;

        this.controlId?.setValue(this.currentUser.id);
        this.controlName?.setValue(this.currentUser.name);
        this.controlLastName?.setValue(this.currentUser.lastName);
        this.controlEmail?.setValue(this.currentUser.email);
        this.controlPhone?.setValue(this.currentUser.phone);
        this.controlAddress?.setValue(this.currentUser.address);
        this.controlBirthdate?.setValue(this.currentUser.birthdate);
      },
    });
  }

  protected get controlId() {
    return this.formUser.get('id');
  }
  protected get controlName() {
    return this.formUser.get('name');
  }
  protected get controlLastName() {
    return this.formUser.get('lastName');
  }
  protected get controlEmail() {
    return this.formUser.get('email');
  }
  protected get controlPhone() {
    return this.formUser.get('phone');
  }
  protected get controlAddress() {
    return this.formUser.get('address');
  }
  protected get controlBirthdate() {
    return this.formUser.get('birthdate');
  }

  onClear() {
    this.controlName?.setValue(this.currentUser.name);
    this.controlLastName?.setValue(this.currentUser.lastName);
    this.controlEmail?.setValue(this.currentUser.email);
    this.controlPhone?.setValue(this.currentUser.phone);
    this.controlAddress?.setValue(this.currentUser.address);
    this.controlBirthdate?.setValue(this.currentUser.birthdate);
  }

  onSubmit() {
    if (this.formUser.valid) {
      const request = this.formUser.value;
      this.userService.editUser(request).subscribe({
        next: (response) => {
          this.router.navigateByUrl('/users');
        },
      });
    }
  }
}
