import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ApproveRejectRidePage } from './approve-reject-ride.page';

const routes: Routes = [
  {
    path: '',
    component: ApproveRejectRidePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ApproveRejectRidePage]
})
export class ApproveRejectRidePageModule {}
