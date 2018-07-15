import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { UiService } from '../../services/ui.service';
import { Router } from '@angular/router';

declare var $:any;

@Component({
    moduleId:module.id,
    selector: 'lock-cmp',
    templateUrl: './lock.component.html'
})

export class LockComponent implements OnInit{
    user;
    constructor(
        private af: AngularFire,
        private auth: AuthService,
        private userService: UserService,
        private ui: UiService,
        private router: Router,
    ) {}

    test : Date = new Date();
    checkFullPageBackgroundImage(){
        var $page = $('.full-page');
        var image_src = $page.data('image');

        if(image_src !== undefined){
            var image_container = '<div class="full-page-background" style="background-image: url(' + image_src + ') "/>'
            $page.append(image_container);
        }
    };
    ngOnInit(){
        this.checkFullPageBackgroundImage();

        setTimeout(function(){
            // after 1000 ms we add the class animated to the login/register card
            $('.card').removeClass('card-hidden');
        }, 700)
    }

    setPasswordAndConnect(form) {
        if (form.password !== form.confirmPassword) {
            this.ui.danger('Les mots de passe sont différents');
            return;
        }

        this.af.auth.getAuth().auth.updatePassword(form.password)
            .then(() => {
                this.ui.success('Votre mot de passe à bien été modifié');
                this.router.navigateByUrl('/');
            })
            .catch(() => {
                this.router.navigateByUrl('/');
                this.ui.warning('Vous êtes connecté depuis trop longtemps, veuillez vous déconnecter puis vous reconnecter pour changer de mot de passe');
            });
    }
}
