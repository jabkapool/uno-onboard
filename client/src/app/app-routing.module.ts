import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'apiversion', loadChildren: () => import('./api-version/api-version-routing.module').then(m => m.ApiVersionRoutingModule)},
  { path: 'homepage', loadChildren: () => import('./home-page/home-page.module').then(m => m.HomePageModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
