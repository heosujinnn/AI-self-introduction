import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AiListPageRoutingModule } from './ai-list-routing.module';

import { AiListPage } from './ai-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AiListPageRoutingModule
  ],
  declarations: [AiListPage]
})
export class AiListPageModule {}
