import { Component, OnInit } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';
import { Router } from '@angular/router';

declare const $: any;

// Metadata
export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    collapse?: string;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    ab: string;
    type?: string;
}

// Menu Items
export const ROUTES: RouteInfo[] = [
    {
        path: '/dashboard',
        title: 'Dashboard',
        type: 'link',
        icontype: 'dashboard'
    },
    // {
    //     path: '/deposits',
    //     title: 'Deposits',
    //     type: 'link',
    //     icontype: 'content_paste'
    // },
    // {
    //     path: '/withdrawals',
    //     title: 'withdrawals',
    //     type: 'link',
    //     icontype: 'pages'
    // },
    {
        path: '/makers',
        title: 'makers',
        type: 'sub',
        icontype: 'grid_on',
        collapse: 'makers',
        children: [
            {path: 'maker-approves', title: 'maker approve list', ab: 'MA'},
            {path: 'deposit', title: 'deposit', ab: 'Dep'}
        ]
    },
    {
        path: '/checkers',
        title: 'checkers',
        type: 'sub',
        icontype: 'link',
        collapse: 'checkers',
        children: [
            {path: 'checker-approves', title: 'checker approve list', ab: 'CA'}
        ]
    },
    {
        path: '/traders',
        title: 'traders',
        type: 'sub',
        icontype: 'apps',
        collapse: 'traders',
        children: [
            {path: 'orders', title: 'order list', ab: 'OL'},
            {path: 'price-setting', title: 'price setting', ab: 'PS'}
        ]
    },
    {
        path: '/accounts',
        title: 'accounts',
        type: 'sub',
        icontype: 'image',
        collapse: 'accounts',
        children: [
            {path: 'deposits', title: 'deposit list', ab: 'DL'},
            {path: 'withdrawals', title: 'withdrawal list', ab: 'WL'},
            {path: 'swap-comm', title: 'swap-comm list', ab: 'SCL'},
            {path: 'order-profit', title: 'order-profit list', ab: 'OPL'}
        ]
    }
    // ,
    // {
    //     path: '/components',
    //     title: 'Components',
    //     type: 'sub',
    //     icontype: 'apps',
    //     collapse: 'components',
    //     children: [
    //         {path: 'buttons', title: 'Buttons', ab:'B'},
    //         {path: 'grid', title: 'Grid System', ab:'GS'},
    //         {path: 'panels', title: 'Panels', ab:'P'},
    //         {path: 'sweet-alert', title: 'Sweet Alert', ab:'SA'},
    //         {path: 'notifications', title: 'Notifications', ab:'N'},
    //         {path: 'icons', title: 'Icons', ab:'I'},
    //         {path: 'typography', title: 'Typography', ab:'T'}
    //     ]
    // ,
    // {
    //     path: '/forms',
    //     title: 'Forms',
    //     type: 'sub',
    //     icontype: 'content_paste',
    //     collapse: 'forms',
    //     children: [
    //         {path: 'regular', title: 'Regular Forms', ab:'RF'},
    //         {path: 'extended', title: 'Extended Forms', ab:'EF'},
    //         {path: 'validation', title: 'Validation Forms', ab:'VF'},
    //         {path: 'wizard', title: 'Wizard', ab:'W'}
    //     ]
    // }
    // ,
    // {
    //     path: '/tables',
    //     title: 'Tables',
    //     type: 'sub',
    //     icontype: 'grid_on',
    //     collapse: 'tables',
    //     children: [
    //         {path: 'regular', title: 'Regular Tables', ab: 'RT'},
    //         {path: 'extended', title: 'Extended Tables', ab: 'ET'},
    //         {path: 'datatables.net', title: 'Datatables.net', ab: 'DT'}
    //     ]
    // }
    // ,
    // {
    //     path: '/maps',
    //     title: 'Maps',
    //     type: 'sub',
    //     icontype: 'place',
    //     collapse: 'maps',
    //     children: [
    //         {path: 'google', title: 'Google Maps', ab:'GM'},
    //         {path: 'fullscreen', title: 'Full Screen Map', ab:'FSM'},
    //         {path: 'vector', title: 'Vector Map', ab:'VM'}
    //     ]
    // },{
    //     path: '/widgets',
    //     title: 'Widgets',
    //     type: 'link',
    //     icontype: 'widgets'

    // },{
    //     path: '/charts',
    //     title: 'Charts',
    //     type: 'link',
    //     icontype: 'timeline'

    // },{
    //     path: '/calendar',
    //     title: 'Calendar',
    //     type: 'link',
    //     icontype: 'date_range'
    // },{
    //     path: '/pages',
    //     title: 'Pages',
    //     type: 'sub',
    //     icontype: 'image',
    //     collapse: 'pages',
    //     children: [
    //         {path: 'pricing', title: 'Pricing', ab:'P'},
    //         {path: 'timeline', title: 'Timeline Page', ab:'TP'},
    //         {path: 'login', title: 'Login Page', ab:'LP'},
    //         {path: 'register', title: 'Register Page', ab:'RP'},
    //         {path: 'lock', title: 'Lock Screen Page', ab:'LSP'},
    //         {path: 'user', title: 'User Page', ab:'UP'}
    //     ]
    // }
];
@Component({
    selector: 'app-sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    public displayName: string;

    constructor(private router: Router) {}

    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
        this.displayName = JSON.parse(localStorage.getItem('profileBackend')).email;
    }
    updatePS(): void {
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
            const ps = new PerfectScrollbar(elemSidebar, { wheelSpeed: 2, suppressScrollX: true });
        }
    }
    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }
    onSignout() {
        localStorage.removeItem('profileBackend');
        localStorage.removeItem('loginedBackend');
        // this.afAuth.auth.signOut();
        this.router.navigate(['/pages/login']);
      }
}
