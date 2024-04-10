import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';
import { AuthComponent } from './auth.component';

export const routes: Routes = [
    {
        path: '',
        component: AuthComponent,
        children: [
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'passwordrecovery',
                component: PasswordRecoveryComponent
            }
        ]
    },
    {
        path: 'homepage',
        // canActivate: [],
        loadChildren: () => import('../home-page/home-page.module').then(m => m.HomePageModule)
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }