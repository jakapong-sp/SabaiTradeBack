import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';

export const AppRoutes: Routes = [
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    }, {
      path: '',
      component: AdminLayoutComponent,
      children: [
          {
        path: '',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
    }, {
        path: 'deposits',
        loadChildren: './deposits/deposits.module#DepositsModule'
    }, {
        path: 'withdrawals',
        loadChildren: './withdrawals/withdrawals.module#WithdrawalsModule'
    }, {
        path: 'components',
        loadChildren: './components/components.module#ComponentsModule'
    }, {
        path: 'forms',
        loadChildren: './forms/forms.module#Forms'
    }, {
        path: 'tables',
        loadChildren: './tables/tables.module#TablesModule'
    }, {
        path: 'maps',
        loadChildren: './maps/maps.module#MapsModule'
    }, {
        path: 'widgets',
        loadChildren: './widgets/widgets.module#WidgetsModule'
    }, {
        path: 'charts',
        loadChildren: './charts/charts.module#ChartsModule'
    }, {
        path: 'calendar',
        loadChildren: './calendar/calendar.module#CalendarModule'
    }, {
        path: '',
        loadChildren: './userpage/user.module#UserModule'
    }, {
        path: '',
        loadChildren: './timeline/timeline.module#TimelineModule'
    }, {
        path: 'makers',
        loadChildren: './makers/makers.module#MakersModule'
    }, {
        path: 'checkers',
        loadChildren: './checkers/checkers.module#CheckersModule'
    }
  ]}, {
      path: '',
      component: AuthLayoutComponent,
      children: [{
        path: 'pages',
        loadChildren: './pages/pages.module#PagesModule'
      }]
    }
];
