import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { IntroFormComponent } from './intro-form/intro-form.component';

const routes: Routes = [
  {path: 'welcome',component:WelcomeComponent},
  {path: 'formulaire',component:IntroFormComponent},
  {path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
  { path: 'travellers', loadChildren: () => import('./travellers/travellers.module').then(m => m.TravellersModule) },
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  { path: '',   redirectTo: 'welcome', pathMatch: 'full' },
  // otherwise redirect to home
  // { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
