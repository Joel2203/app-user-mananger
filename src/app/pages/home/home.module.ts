import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeMainComponent } from './home-main/home-main.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HomeMainComponent],
  imports: [CommonModule, MatButtonModule, RouterModule, HomeRoutingModule],
})
export class HomeModule {}
