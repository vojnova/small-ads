import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserGuard} from './auth/user.guard';
import {AngularFireAuthGuard} from '@angular/fire/auth-guard';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/welcome'},
  {path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule)},
  {path: 'ads', loadChildren: () => import('./ads/ads.module').then(m => m.AdsModule)},
  {path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule), canActivate: [AngularFireAuthGuard]},
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
