import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './musa-services/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'challenge/new',
    loadChildren: () => import('./challenge/new/new.module').then( m => m.NewChallengePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'challenge/view',
    loadChildren: () => import('./challenge/view/view.module').then( m => m.ViewChallengePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'challenge/join',
    loadChildren: () => import('./challenge/join/join.module').then( m => m.JoinChallengePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
