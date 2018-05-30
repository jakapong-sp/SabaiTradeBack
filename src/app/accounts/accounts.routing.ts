import { Routes } from '@angular/router';
import { SecuredRouteGuard } from '../secured-route.guard';
import { DepositsComponent } from './deposits/deposits.component';
import { WithdrawalsComponent } from './withdrawals/withdrawals.component';
import { SwapCommComponent } from './swap-comm/swap-comm.component';
import { OrderProfitComponent } from './order-profit/order-profit.component';

export const AccountsRoutes: Routes = [
    {
      path: '',
      children: [ {
        path: 'deposits',
        component: DepositsComponent,
        canActivate: [SecuredRouteGuard]
    }]
}, {
    path: '',
    children: [{
        path: 'withdrawals',
        component: WithdrawalsComponent,
        canActivate: [SecuredRouteGuard]
    }]
}, {
    path: '',
    children: [{
        path: 'swap-comm',
        component: SwapCommComponent,
        canActivate: [SecuredRouteGuard]
    }]
}, {
    path: '',
    children: [{
        path: 'order-profit',
        component: OrderProfitComponent,
        canActivate: [SecuredRouteGuard]
    }]
}
];
