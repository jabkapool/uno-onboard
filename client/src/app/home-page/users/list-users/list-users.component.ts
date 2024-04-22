import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from 'src/app/data/user';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit, OnDestroy{
  private unsubscribe$ = new Subject<void>();
  isUserAdmin: boolean = false;
  users: User[] = [];
  searchText!: string;
  noData: boolean = false;
  noDataMessage: string = 'There are no users with that name or email';
  displayedColumns: string[] = ['nome', 'email', 'role', 'phone', 'edit', 'delete'];
 
  constructor(private usersService: UsersService, 
              private router: Router, 
              private route: ActivatedRoute,
              private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.isUserAdmin = this.authenticationService.hasPermission(this.route.snapshot);
    this.showAllUsers();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  showAllUsers(): void {
    this.usersService.getAllUsers()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (usersList: any) => {
          this.users = usersList;
        },
        error: (error: any) => {
          console.log(error);
          this.users = [];
        }
      });
  }

  filterUsers(): void {
    this.usersService.listUsers(this.searchText)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (usersList: any) => { 
          this.users = usersList;
          this.noData = false;
        },
        error: () => {
          this.users = [];
          this.noData = true;
        }
      });
  }

  createUser() : void {
    if(this.isUserAdmin) {
      this.router.navigate(['../createuser'], {relativeTo: this.route});
    }
    else {
      alert('You do not have permission to create a new user');
    }
  }

  checkIfUserIsAdmin(): boolean {
    if(sessionStorage.getItem('role') === 'Admin') {
      return true;
    }
    return false;
  }

  goToUserDetails(id: string): void {
    this.router.navigate(['../userdetails', id], {relativeTo: this.route});
  }

  deleteUser(id: string): void {
    this.usersService.deleteUser(id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {
          this.router.navigate(['./listusers'], {relativeTo: this.route});
        },
        error: (error: any) => {
          console.log(error);
        }
      });
    }
}

