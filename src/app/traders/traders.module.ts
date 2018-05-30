import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../app.module';
import { TradersRoutes } from './traders.routing';
import { FormsModule } from '@angular/forms';
import { environment } from 'environments/environment';
import { OrdersComponent } from './orders/orders.component';
import { PriceSettingComponent } from './price-setting/price-setting.component';

@NgModule({
    imports: [
        RouterModule.forChild(TradersRoutes),
        CommonModule,
        MaterialModule,
        FormsModule
    ],
    declarations: [OrdersComponent, PriceSettingComponent]
})
export class TradersModule {}
