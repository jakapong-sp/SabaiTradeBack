import { Routes } from '@angular/router';
import { DepositsComponent } from './deposits.component';
import { SecuredRouteGuard } from '../secured-route.guard';

export const DepositsRoutes: Routes = [
    {

      path: '',
      children: [ {
        path: '',
        component: DepositsComponent,
        canActivate: [SecuredRouteGuard]
    }]
}
];
