import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'home',
    component: TabsPage,
    children: [
      {
        path: 'challenges',
        loadChildren: () => import('../challenges/challenges.module').then(m => m.ChallengesPageModule)
      },
      {
        path: 'leaderboard',
        loadChildren: () => import('../leaderboard/leaderboard.module').then(m => m.LeaderboardPageModule)
      },
      {
        path: 'friends',
        loadChildren: () => import('../me/me.module').then(m => m.MePageModule)
      },
      {
        path: 'me',
        loadChildren: () => import('../me/me.module').then(m => m.MePageModule)
      },
      {
        path: '',
        redirectTo: '/home/challenges',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/home/challenges',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
