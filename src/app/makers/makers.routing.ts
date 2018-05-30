import { Routes } from '@angular/router';
import { SecuredRouteGuard } from '../secured-route.guard';
import { DepositComponent } from './deposit/deposit.component';
import { MakerApprovesComponent } from './maker-approves/maker-approves.component';

export const MakersRoutes: Routes = [
    {
        path: '',
        children: [{
            path: 'maker-approves',
            component: MakerApprovesComponent,
            canActivate: [SecuredRouteGuard]
        }]
    }, {
        path: '',
        children: [{
            path: 'deposit',
            component: DepositComponent,
            canActivate: [SecuredRouteGuard]
        }]
    }
];
