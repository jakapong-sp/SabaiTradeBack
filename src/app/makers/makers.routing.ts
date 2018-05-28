import { Routes } from '@angular/router';
import { SecuredRouteGuard } from '../secured-route.guard';
import { DepwithComponent } from './depwith/depwith.component';
import { DepositComponent } from './deposit/deposit.component';

export const MakersRoutes: Routes = [
    {
        path: '',
        children: [{
            path: 'maker-approves',
            component: DepwithComponent
        }]
    }, {
        path: '',
        children: [{
          path: 'deposit',
          component: DepositComponent
        }]
      }
];
