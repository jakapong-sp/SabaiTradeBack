import { Routes } from '@angular/router';
import { SecuredRouteGuard } from '../secured-route.guard';
import { OrdersComponent } from './orders/orders.component';
import { PriceSettingComponent } from './price-setting/price-setting.component';

export const TradersRoutes: Routes = [
    {
        path: '',
        children: [{
            path: 'orders',
            component: OrdersComponent,
            canActivate: [SecuredRouteGuard]
        }]
    }
    , {
        path: '',
        children: [{
          path: 'price-setting',
          component: PriceSettingComponent,
          canActivate: [SecuredRouteGuard]
        }]
      }
];
