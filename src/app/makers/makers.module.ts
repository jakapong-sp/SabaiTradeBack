import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../app.module';
import { MakersRoutes } from './makers.routing';
import { FormsModule } from '@angular/forms';
import { environment } from 'environments/environment';
import { DepwithComponent } from './depwith/depwith.component';
import { DepositComponent } from './deposit/deposit.component';
import { MakerApprovesComponent } from './maker-approves/maker-approves.component';

@NgModule({
    imports: [
        RouterModule.forChild(MakersRoutes),
        CommonModule,
        MaterialModule,
        FormsModule
    ],
    declarations: [DepwithComponent, DepositComponent, MakerApprovesComponent]
})

export class MakersModule {}
