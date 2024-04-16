import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/data/user';
import { UsersService } from 'src/app/services/users.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.css']
})
export class CreateUsersComponent implements OnInit {
  user: User = {} as User;
  errorFlag: boolean = false;
  errorMessage: string = '';
  createUserForm: FormGroup = {} as FormGroup;
  submitted: boolean = false;
  private unsubscribe$ = new Subject<void>();

  constructor(private userService: UsersService,
              private router: Router, 
              private formBuilder: FormBuilder,
              private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.createUserForm = this.formBuilder.group({
        name: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        role: new FormControl('', [Validators.required]),
        phone: new FormControl('',[Validators.required])
      });
    this.createUser();
  }

  get formControls() {
    return this.createUserForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.user.name = this.createUserForm.get('name')?.value as string;
    this.user.email = this.createUserForm.get('email')?.value as string;
    this.user.role = this.createUserForm.get('role')?.value as string;
    this.user.phoneNumber = this.createUserForm.get('phone')?.value as string;

    if(this.createUserForm.invalid) {
      return;
    }

    this.userService.createUser(this.user).pipe(takeUntil(this.unsubscribe$))
      .subscribe({
          next: () => {
              this.goToUsersList();
          },
          error: (error: any) => {
              this.errorFlag = true;
              try {
                  this.errorMessage = "The user has not been created. Try again later."
                  return;
              }
              catch {}
          }
      })
  }

  createUser(): void {
    this.userService.createUser(this.user);
  }

  goToUsersList(): void{
    this.router.navigate(['../listusers'], {relativeTo: this.route});
  }

}
