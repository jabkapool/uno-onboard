import { Component, OnDestroy } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {
  email: string = '';
  password: string = '';
  errorFlag: boolean = false;
  errorMessage: string = '';
  private unsubscribe$ = new Subject<void>();

  constructor(private loginService:LoginService, private router:Router){
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  /**
   * @remarks Error handling comes from backend, so there's really no need to error handle here. 
   *          The only advantage (which can be important; we can always check both in the backend and frontend in case user disables javascript in browser)
   *          is not wasting time and resources checking in backend if some validation is made by typescript/javascript.
   *  - if the email is left blanck, the backend will return an error message: "Email is required."
   *  - if the password is left blanck, the backend will return an error message: "Password is required."
   *  - Other checks the backend does in the third catch block.
   *      - Invalid Email (format)
   *      - Invalid Password
   * 
   *  If login succeeds, user is redirected to the home page. The Api Version page (for now).
   * @returns void
   */
  onSubmit(): void {
    this.loginService.login(this.email, this.password)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res: any) => {          
          this.loginService.storeToken(res.token);
          this.goToHomePage(); 
        },
        error: (error) => {
          console.log("entra aqui");
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
        }
    });  
  }

  /**
   * @remarks Redirects to the temporary home page (Api Version page)
   * @param None
   * @returns void
   */
  goToHomePage(): void{   
      this.router.navigate(['/apiversion']);
  }
}