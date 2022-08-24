import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewChallengePageRoutingModule } from './new-routing.module';

import { NewChallengePage } from './new.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewChallengePageRoutingModule
  ],
  declarations: [NewChallengePage]
})
export class NewChallengePageModule {}
