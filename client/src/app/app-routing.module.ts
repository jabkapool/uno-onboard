import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiVersionComponent } from './api-version/api-version.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'homepage', loadChildren: () => import('./home-page/home-page.module').then(m => m.HomePageModule) },
  { path: 'login', loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule) },
  { path: 'passwordrecovery', loadChildren: () => import('./auth/password-recovery/password-recovery.module').then(m => m.PasswordRecoveryModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
