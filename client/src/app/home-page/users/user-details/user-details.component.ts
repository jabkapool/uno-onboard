import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/data/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { Subject, takeUntil } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  user?: User;
  private unsubscribe$ = new Subject<void>();
  image: any;

  constructor(private router:Router,  
              private route: ActivatedRoute,
              private userService: UsersService,
            private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.unsubscribe$))
      .subscribe(params => {
        const id = params['id'];
        this.userService.getUserById(id)
        .pipe(takeUntil(this.unsubscribe$))
          .subscribe({
            next: (user: User) => {
              this.user = user;
              this.image = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + this.user.picture);
            },
            error: (error: any) => {
              console.log(error);
            }
      });
    });
  }
  
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
