import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './template/layout/layout.component';

const routes: Routes =
  [
    { path: 'login', component: LoginComponent },
    { path: '', component: LayoutComponent, children: [
        { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
        { path: '', redirectTo: '/home', pathMatch: 'full' }
      ]
    },
    { path: 'login', loadChildren: () => import('./auth/login.module').then(m => m.LoginModule) },
  ];

  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
