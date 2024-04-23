import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/data/user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {
  isUserAdmin: boolean = false;
 user: User = {
    id: '',
    name: '',
    email: '',
    role: '',
    phoneNumber: '',
    picture: ''
  };

  constructor(private router: Router, 
              private route: ActivatedRoute,
              private usersService: UsersService,
              private authenticationService: AuthenticationService) { }
  
  goToListUsers(): void {
    this.isUserAdmin = this.authenticationService.hasPermission(this.route.snapshot);
    if(this.isUserAdmin) {
      this.router.navigate(['listusers'], {relativeTo: this.route});
    }
    else {
      alert('You do not have permission to access this page.');
    }
  }

  goToSensors(): void {
    this.router.navigate(['sensors/listsensors'], {relativeTo: this.route});
  }

  goToDashboards(): void {
    this.router.navigate(['dashboards/listdashboards'], {relativeTo: this.route});
  }

  goToHomePage(): void {
    this.router.navigate(['homepage']);
  }

  logout(): void {
    this.user.id = sessionStorage?.getItem('userId') as string;

    if(this.user.id !== null) {
      this.usersService.logoff(this.user)
      .subscribe({
        next: () => {},
        error: (error: any) => {
          console.log(error);
        }
      });

      sessionStorage.removeItem('userId');
      sessionStorage.removeItem('userName');
      sessionStorage.removeItem('role');
      sessionStorage.removeItem('token');

      this.router.navigate(['../login'], {relativeTo: this.route});
    }
    else {
      alert('Could not log off. Please try again.');
    }
  }
}
