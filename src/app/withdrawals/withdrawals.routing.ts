import { Routes } from '@angular/router';
import { WithdrawalsComponent } from './withdrawals.component';
import { SecuredRouteGuard } from '../secured-route.guard';

export const WithdrawalsRoutes: Routes = [
    {

      path: '',
      children: [ {
        path: '',
        component: WithdrawalsComponent,
        canActivate: [SecuredRouteGuard]
    }]
}
];
