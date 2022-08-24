import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChallengesPage } from './challenges.page';

import { ChallengesPageRoutingModule } from './challenges-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ChallengesPageRoutingModule
  ],
  declarations: [ChallengesPage]
})
export class ChallengesPageModule {}
