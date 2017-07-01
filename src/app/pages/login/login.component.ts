import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Form } from '@angular/forms';

import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'login-cmp',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit{
    test: Date = new Date();
    
    private email: string;
    private password: string;

    constructor( private auth: AuthService, private router: Router ) { }

    loginWithCredentials({ email, password }) {
        this.auth.loginWithCredentials(email, password).then((state) => {
            this.router.navigateByUrl('/dashboard');
        });
    }

    loginWithGoogle() {
        this.auth.loginWithGoogle().then(() => {
            this.router.navigateByUrl('/dashboard');
        });
    }

    checkFullPageBackgroundImage() {
        const $page = $('.full-page');
        const image_src = $page.data('image');

        if (image_src !== undefined){
            const image_container = '<div class="full-page-background" style="background-image: url(' + image_src + ') "/>'
            $page.append(image_container);
        }
    };
    ngOnInit() {

        this.checkFullPageBackgroundImage();

        setTimeout(function(){
            // after 1000 ms we add the class animated to the login/register card
            $('.card').removeClass('card-hidden');
        }, 700)
    }

}
