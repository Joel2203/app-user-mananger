import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  title = 'Crear Usuario';
  formUser!: FormGroup;
  today = new Date();

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formUser = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      birthdate: [this.today, [Validators.required]],
    });
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
    this.controlName?.setValue('');
    this.controlLastName?.setValue('');
    this.controlEmail?.setValue('');
    this.controlPhone?.setValue('');
    this.controlAddress?.setValue('');
    this.controlBirthdate?.setValue(this.today);
  }

  onSubmit() {
    if (this.formUser.valid) {
      const request = this.formUser.value;
      this.userService.registerUser(request).subscribe({
        next: (response) => {
          this.router.navigateByUrl('/users');
        },
      });
    }
  }
}
