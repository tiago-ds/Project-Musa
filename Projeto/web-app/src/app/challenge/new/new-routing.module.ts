import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewChallengePage } from './new.page';

const routes: Routes = [
  {
    path: '',
    component: NewChallengePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewChallengePageRoutingModule {}
