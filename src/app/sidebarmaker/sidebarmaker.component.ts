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
    {
        path: '/deposits',
        title: 'Deposits',
        type: 'link',
        icontype: 'content_paste'
    },
    {
        path: '/withdrawals',
        title: 'withdrawals',
        type: 'link',
        icontype: 'pages'
    },
    {
        path: '/makers',
        title: 'makers',
        type: 'sub',
        icontype: 'grid_on',
        collapse: 'makers',
        children: [
            {path: 'depwith', title: 'deposit withdrawal list', ab: 'DW'}
        ]
    }
];
@Component({
  selector: 'app-sidebarmaker-cmp',
  templateUrl: './sidebarmaker.component.html'
})

export class SidebarmakerComponent implements OnInit {
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

