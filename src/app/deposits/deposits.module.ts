import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../app.module';

import { DepositsComponent } from './deposits.component';
import { DepositsRoutes } from './deposits.routing';
import { FormsModule } from '@angular/forms';
import { environment } from 'environments/environment';

@NgModule({
    imports: [
        RouterModule.forChild(DepositsRoutes),
        CommonModule,
        MaterialModule,
        FormsModule
    ],
    declarations: [DepositsComponent]
})

export class DepositsModule {}
