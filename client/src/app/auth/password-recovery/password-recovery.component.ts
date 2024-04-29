import { Component, OnDestroy } from '@angular/core';
import { PasswordRecoveryService } from 'src/app/services/password-recovery.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css']
})
export class PasswordRecoveryComponent implements OnDestroy {
  errorFlag: boolean = false;
  errorMessage: string = '';
  passwordRecoveryForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  private unsubscribe$ = new Subject<void>();

  constructor(private passwordRecoveryService: PasswordRecoveryService, private router: Router) { }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSubmit(): void {
    this.passwordRecoveryService.passwordRecovery(this.getEmail())
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res: any) => {
          this.goToLoginPage();
        },
        error: (error) => {
          this.errorFlag = true;
          this.errorMessage = "An error occurred while trying to send you a new password.";
        }
      });
  }

  getEmail(): string {
    return this.passwordRecoveryForm.get('email')?.value as string;
  }

  goToLoginPage(): void {
    this.router.navigate(['/login']);
  }

}
