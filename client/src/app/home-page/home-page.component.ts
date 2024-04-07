import { Component, OnInit, OnDestroy } from '@angular/core';
import { HomePageService } from '../services/home-page.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  constructor(private homePageService: HomePageService) { }

  ngOnInit(): void {
    this.getWelcomeMessage();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getWelcomeMessage(): void {
    this.homePageService.getHomePage()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (response: any) => { console.log(response);},
        error: (error: any) => { console.log(error);}
      });
  }
}
