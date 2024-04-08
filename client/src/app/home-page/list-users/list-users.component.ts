import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Users } from 'src/app/data/users';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit, OnDestroy{
  private unsubscribe$ = new Subject<void>();
  users: Users[] = [];
  displayedColumns: string[] = ['nome', 'email', 'phone'];
  searchText!: string;
  noData: boolean = false;
  noDataMessage: string = 'There are no users with that name or email';

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
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
          console.log(this.users);
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
        error: (error: any) => {
          this.users = [];
          this.noData = true;
        }
      });
  }

}
