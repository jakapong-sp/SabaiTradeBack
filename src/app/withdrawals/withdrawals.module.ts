import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../app.module';

import { WithdrawalsComponent } from './withdrawals.component';
import { WithdrawalsRoutes } from './withdrawals.routing';
import { FormsModule } from '@angular/forms';
import { environment } from 'environments/environment';

@NgModule({
    imports: [
        RouterModule.forChild(WithdrawalsRoutes),
        CommonModule,
        MaterialModule,
        FormsModule
    ],
    declarations: [WithdrawalsComponent]
})

export class WithdrawalsModule {}
