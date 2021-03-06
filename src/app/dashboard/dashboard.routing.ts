import { Routes } from '@angular/router';
import { SecuredRouteGuard } from '../secured-route.guard';
import { DashboardComponent } from './dashboard.component';

export const DashboardRoutes: Routes = [
    {

      path: '',
      children: [ {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [SecuredRouteGuard]
    }]
}
];
