import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./shared/components/login/login-routing.module').then(m => m.LoginRoutingModule)},
  { path: 'apiversion', loadChildren: () => import('./api-version/api-version-routing.module').then(m => m.ApiVersionRoutingModule)},
  { path: 'homepage', loadChildren: () => import('./home-page/home-page-routing.module').then(m => m.HomePageRoutingModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
