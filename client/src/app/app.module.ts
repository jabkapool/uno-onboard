import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiVersionComponent } from './api-version/api-version.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './data/auth-interceptor';
import { SideBarComponent } from './shared/components/side-bar/side-bar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { TopBarComponent } from './shared/components/top-bar/top-bar.component';
import { DashboardsComponent } from './shared/components/dashboards/dashboards.component';
import { SensorsComponent } from './shared/components/sensors/sensors.component';

@NgModule({
  declarations: [
    AppComponent,
    ApiVersionComponent,
    SideBarComponent,
    HomePageComponent,
    TopBarComponent,
    DashboardsComponent,
    SensorsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
