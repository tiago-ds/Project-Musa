import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JoinChallengePage } from './join.page';

const routes: Routes = [
  {
    path: '',
    component: JoinChallengePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JoinChallengePageRoutingModule {}
