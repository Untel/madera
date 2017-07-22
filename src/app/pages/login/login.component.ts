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
    errorMessage: any = undefined;

    backgroundColor = 'green';

    private email: string;
    private password: string;

    constructor( private auth: AuthService, private router: Router ) { }

    loginWithCredentials({ email, password }) {
        this.auth.loginWithCredentials(email, password).then((state) => {
            this.router.navigateByUrl('/dashboard');
        }).catch(err => this.displayError(err) );
    }

    loginWithGoogle() {
        this.auth.loginWithGoogle().then(() => {
            this.router.navigateByUrl('/dashboard');
        }).catch(err => this.displayError(err) );
    }


    getRandomColor(actualColor) {
        const colors = ['red', 'purple', 'rose', 'orange', 'blue'];

        if (actualColor) {
            const indexActual = colors.indexOf(actualColor);
            colors.splice(indexActual, 1);
        }

        const random = Math.floor(Math.random() * colors.length);

        return colors[random];
    }

    displayError(err) {
        const header = $('#cardHeader');
        const actualColor = header.attr('data-background-color');
        console.log(err, 'color:', actualColor);
        const randomColor = this.getRandomColor(actualColor);

        switch(err.code) {
            case 'auth/invalid-email': {
                header.attr('data-background-color', randomColor);
                this.errorMessage = `Cette adresse e-mail est inconnue`;
                break;
            }
            case 'auth/wrong-password': {
                header.attr('data-background-color', randomColor);
                this.errorMessage = `Ce mot de passe est invalide, ou ce compte n'a pas de mot de passe`;
                break;
            }
            case 'auth/popup-closed-by-user': {
                header.attr('data-background-color', randomColor);
                this.errorMessage = `Vous avez refermé la pop-up avant la connexion`;
                break;
            }
            case 'auth/network-request-failed': {
                header.attr('data-background-color', randomColor);
                this.errorMessage = `Oops, un problème de connexion est intervenue`;
                break;
            }
            default: {
                header.attr('data-background-color', randomColor);
                this.errorMessage = err.message || `Oops, une érreure inatendue s'est produite`;
                break;
            }
        }

        // setTimeout(() => {
        //     header.attr('data-background-color', 'green');
        //     this.errorMessage = undefined;
        // }, 5000);
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
