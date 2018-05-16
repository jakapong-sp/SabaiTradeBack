import { Routes } from '@angular/router';
import { SecuredRouteGuard } from '../secured-route.guard';
import { DepwithComponent } from './depwith/depwith.component';

export const MakersRoutes: Routes = [
    {
      path: '',
      children: [ {
        path: 'depwith',
        component: DepwithComponent
    }]
}
];
