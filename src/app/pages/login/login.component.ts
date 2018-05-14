import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { PagesService } from '../pages.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
    selector: 'app-login-cmp',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit, OnDestroy {
    test: Date = new Date();
    private toggleButton: any;
    private sidebarVisible: boolean;
    private nativeElement: Node;

    loginForm: FormGroup;
    loginFeedback: any;
    profile: any;
    isLogin: boolean;
    isError: boolean;

    constructor(private element: ElementRef, private router: Router, private ps: PagesService, private fb: FormBuilder) {
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
    }

    ngOnInit() {
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        const body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');
        body.classList.add('off-canvas-sidebar');
        const card = document.getElementsByClassName('card')[0];
        setTimeout(function() {
            // after 1000 ms we add the class animated to the login/register card
            card.classList.remove('card-hidden');
        }, 700);

        this.buildForm();
        this.isError = false;
        const profile = localStorage.getItem('profileBackend');
        if (profile) {
            this.isLogin = true;
            this.profile = JSON.parse(profile);
        }
    }
    sidebarToggle() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        const sidebar = document.getElementsByClassName('navbar-collapse')[0];
        if (this.sidebarVisible === false) {
            setTimeout(function() {
                toggleButton.classList.add('toggled');
            }, 500);
            body.classList.add('nav-open');
            this.sidebarVisible = true;
        } else {
            this.toggleButton.classList.remove('toggled');
            this.sidebarVisible = false;
            body.classList.remove('nav-open');
        }
    }
    ngOnDestroy() {
      const body = document.getElementsByTagName('body')[0];
      body.classList.remove('login-page');
      body.classList.remove('off-canvas-sidebar');
    }

    buildForm(): void {
        this.loginForm = new FormGroup({
            email: new FormControl('', [
                Validators.required,
                Validators.email
            ]),
            password: new FormControl('', [
                Validators.pattern('^(?=.*[0–9])(?=.*[a-zA-Z])([a-zA-Z0–9]+)$'),
                Validators.minLength(6),
                Validators.maxLength(25)
            ])
        });
    }

    login(): void {
        this.ps.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(user => {
            if (user === null) {
                this.isError = true;
            } else {
                const data = {
                    userid: user._id,
                    username: user.UserRef,
                    email: user.Email,
                    role: user.Role
                };
                localStorage.setItem('profileBackend', JSON.stringify(data));
                localStorage.setItem('loginedBackend', 'true');
                this.router.navigate(['/dashboard']);
            }
        });
    }

}
