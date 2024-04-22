import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/data/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { Subject, takeUntil } from 'rxjs';
import { Buffer } from 'buffer';

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
              private userService: UsersService) { }

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.unsubscribe$))
      .subscribe(params => {
        const id = params['id'];
        this.userService.getUserById(id)
        .pipe(takeUntil(this.unsubscribe$))
          .subscribe({
            next: (user: User) => {
              this.user = user;
              var originalBase64ImageStr = Buffer.from(this.user.picture).toString('utf8');
              this.image = 'data:image/png;base64,' + originalBase64ImageStr;
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

  editUser(id: string): void {
    this.router.navigate(['../../edituser', id], {relativeTo: this.route});
  }

}
