import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../app.module';
import { AccountsRoutes } from './accounts.routing';
import { FormsModule } from '@angular/forms';
import { environment } from 'environments/environment';
import { DepositsComponent } from './deposits/deposits.component';
import { WithdrawalsComponent } from './withdrawals/withdrawals.component';
import { SwapCommComponent } from './swap-comm/swap-comm.component';
import { OrderProfitComponent } from './order-profit/order-profit.component';

@NgModule({
  imports: [
    RouterModule.forChild(AccountsRoutes),
    CommonModule,
    MaterialModule,
    FormsModule
  ],
  declarations: [DepositsComponent, WithdrawalsComponent, SwapCommComponent, OrderProfitComponent]
})
export class AccountsModule {}
