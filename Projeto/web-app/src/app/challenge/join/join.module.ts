import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JoinChallengePageRoutingModule } from './join-routing.module';

import { JoinChallengePage } from './join.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JoinChallengePageRoutingModule
  ],
  declarations: [JoinChallengePage]
})
export class JoinChallengePageModule {}
