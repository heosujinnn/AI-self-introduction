import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AiListPage } from './ai-list.page';

const routes: Routes = [
  {
    path: '',
    component: AiListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AiListPageRoutingModule {}
