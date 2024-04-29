import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiVersionComponent } from './api-version/api-version.component';

const routes: Routes = [
  {
    path: '',
    //redirectTo: 'homepage', //change to this when canactiveatecanActivate: [], in auth.routing.ts is working
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
