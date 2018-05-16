import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarmakerComponent } from './sidebarmaker.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [ RouterModule, CommonModule ],
  declarations: [SidebarmakerComponent],
  exports: [ SidebarmakerComponent ]
})
export class SidebarmakerModule { }
