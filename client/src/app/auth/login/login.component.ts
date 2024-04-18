import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {
  errorFlag: boolean = false;
  errorMessage: string = '';
  private unsubscribe$ = new Subject<void>();
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });
  showPassword: boolean = true;

  constructor(private authenticationService: AuthenticationService, private router: Router){
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  /**
   * @remarks Error handling comes from backend, hence the responses come from the try-catch blocks in error:(error) => { ... }
   *          Backend checking is always better than frontend checking because the user can always disable javascript in the browser.
   *          The best of the worlds is checking both in backend and frontend, because checking in frontend by typescript/javascript is faster than checking in backend.
   *  - if the email is left blanck, the backend will return an error message: "Email is required."
   *  - if the password is left blanck, the backend will return an error message: "Password is required."
   *  - Other checks the backend does in the 3rd try catch block.
   *      - User not found
   *      - Invalid Password
   * 
   *  If login succeeds, user is redirected to the home page. The Api Version page (for now).
   * @returns void
   */
  onSubmit(): void {
    this.authenticationService.login(this.getEmail(), this.getPassword())
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (response: any) => {
          this.authenticationService.storeUserData(response.userId, 
                                                  response.userName, 
                                                  response.role, 
                                                  response.token);
          this.goToHomePage(); 
        },
        error: (error) => {
          this.errorFlag = true;
          try {
            this.errorMessage = error.error.errors.Email[0] as string; 
            return;
          }
          catch {}

          try {
            this.errorMessage = error.error.errors.Password[0] as string;
            return;
          }
          catch {}

          try {
            this.errorMessage = error.error.loginFailureReason as string;
            return;
          }
          catch {}
          
          try { //In case there is an error and all previous reasons did not apply.
            this.errorMessage = "The system is experiencing technical difficulties. Please try again later.";
            return;
          }
          catch {}
        }
    });
  }

  getEmail(): string {
    return this.loginForm.get('email')?.value as string;
  }

  getPassword(): string {
    return this.loginForm.get('password')?.value as string;
  }

  tooglePasswordVisibility(): void {
    this.loginForm.get('password')?.setValue('');
    this.showPassword = !this.showPassword;
  }

  /**
   * @remarks After login success, navigate to home page
   * @param None
   * @returns void
   */
  goToHomePage(): void{
    this.router.navigate(['/homepage']);
  }
}
