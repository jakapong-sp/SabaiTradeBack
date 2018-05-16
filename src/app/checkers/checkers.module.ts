import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../app.module';
import { CheckersRoutes } from './checkers.routing';
import { FormsModule } from '@angular/forms';
import { environment } from 'environments/environment';
import { CheckerApprovesComponent } from './checker-approves/checker-approves.component';

@NgModule({
  imports: [
    RouterModule.forChild(CheckersRoutes),
    CommonModule,
    MaterialModule,
    FormsModule
  ],
  declarations: [CheckerApprovesComponent]
})
export class CheckersModule { }
