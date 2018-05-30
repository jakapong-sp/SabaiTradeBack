import { Routes } from '@angular/router';
import { SecuredRouteGuard } from '../secured-route.guard';
import { CheckerApprovesComponent } from './checker-approves/checker-approves.component';

export const CheckersRoutes: Routes = [
    {
      path: '',
      children: [ {
        path: 'checker-approves',
        component: CheckerApprovesComponent,
        canActivate: [SecuredRouteGuard]
    }]
}
];
