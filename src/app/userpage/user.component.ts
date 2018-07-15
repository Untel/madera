import { Subscription } from 'rxjs';
import { UiService } from '../services/ui.service';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

import { ResizingCroppingImagesComponent as ResizingCroppingImages } from 'alyle-ui/resizing-cropping-images';
declare var swal;
import {
    animate,
    Component,
    keyframes,
    OnDestroy,
    OnInit,
    state,
    style,
    transition,
    trigger,
    ViewChild,
} from '@angular/core';

import { User } from '../models/user.model';
import { AngularFire } from 'angularfire2';
import { Router } from '@angular/router';

declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'user-cmp',
    templateUrl: 'user.component.html',
    animations: [
        trigger('carduserprofile', [
            state('*', style({
                '-ms-transform': 'translate3D(0px, 0px, 0px)',
                '-webkit-transform': 'translate3D(0px, 0px, 0px)',
                '-moz-transform': 'translate3D(0px, 0px, 0px)',
                '-o-transform':'translate3D(0px, 0px, 0px)',
                transform:'translate3D(0px, 0px, 0px)',
                opacity: 1
            })),
            transition('void => *', [
                style({opacity: 0,
                    '-ms-transform': 'translate3D(0px, 150px, 0px)',
                    '-webkit-transform': 'translate3D(0px, 150px, 0px)',
                    '-moz-transform': 'translate3D(0px, 150px, 0px)',
                    '-o-transform':'translate3D(0px, 150px, 0px)',
                    transform:'translate3D(0px, 150px, 0px)',
                }),
                animate('0.3s 0s ease-out'),
            ])
        ]),
        trigger('cardprofile', [
            state('*', style({
                '-ms-transform': 'translate3D(0px, 0px, 0px)',
                '-webkit-transform': 'translate3D(0px, 0px, 0px)',
                '-moz-transform': 'translate3D(0px, 0px, 0px)',
                '-o-transform':'translate3D(0px, 0px, 0px)',
                transform:'translate3D(0px, 0px, 0px)',
                opacity: 1})),
                transition('void => *', [
                    style({opacity: 0,
                        '-ms-transform': 'translate3D(0px, 150px, 0px)',
                        '-webkit-transform': 'translate3D(0px, 150px, 0px)',
                        '-moz-transform': 'translate3D(0px, 150px, 0px)',
                        '-o-transform':'translate3D(0px, 150px, 0px)',
                        transform:'translate3D(0px, 150px, 0px)',
                    }),
                    animate('0.3s 0.25s ease-out')
                ])
            ])
        ]
    })


    export class UserComponent implements OnInit, OnDestroy {

        @ViewChild('profilForm') form;
        @ViewChild('_img') _img: ResizingCroppingImages;
        user: User;

        userSub: Subscription;

        constructor(
            private userService: UserService,
            private authService: AuthService,
            private ui: UiService,
            private af: AngularFire,
            private router: Router
        ) { }

        ngOnInit() {
            this.userSub = this.userService.user$.subscribe((user) => {
                this.user = user;
            });

            this._img.sizeW = 200;
            this._img.sizeH = 200;

        }

        ngOnDestroy() {
            this.userSub.unsubscribe();
        }

        onSubmit() {

            if (this.form.valid) {
                this.userService
                    .updateUser(this.form.value)
                    .then( () => this.ui.success('Vos informations ont bien été enregistrées'))
                    .catch((err) => this.ui.danger('Une érreure s\'est produite'));
            } else {
                this.ui.warning('Vos informations ne sont pas correctements remplies');
            }

        }

        updateProfilPicture() {
            const b64img = this._img.imgCrop;
            this.userService.uploadProfilPicture(b64img)
                .then( () => {
                    this.ui.success('Votre photo de profil à bien étée enregistrée');
                    this._img.imgCrop = null;
                    this._img.img = null;
                })
                .catch((err) => this.ui.danger('Une érreure s\'est produite'));
        }

        onFileChange($event) {
            this._img.imgChange($event);
        }

        deleteAccount() {
            swal({
                title: 'Êtes vous sur de vouloir supprimer votre compte ?',
                text: 'Cette action est définitive!',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Continuer',
                cancelButtonText: 'Annuler',
                confirmButtonClass: 'btn btn-danger',
                cancelButtonClass: 'btn btn-warning',
                buttonsStyling: false
            }).then((confirmed) => {
                if (confirmed) {
                    swal({
                        title: 'Veuillez saisir votre mot de passe afin de vérifier votre action',
                        text: 'Cette action est définitive!',
                        type: 'question',
                        input: 'password',
                        inputPlaceholder: 'Mot de passe',
                        inputAttributes: {
                            autocapitalize: 'off',
                            autocorrect: 'off'
                        },
                        showCancelButton: true,
                        confirmButtonText: 'Supprimer',
                        cancelButtonText: 'Annuler',
                        confirmButtonClass: 'btn btn-danger',
                        cancelButtonClass: 'btn btn-warning',
                        buttonsStyling: false
                    }).then((inputValue) => {
                        console.log(inputValue);
                        const val = this.authService.credentials && this.authService.credentials.password === inputValue;
                        if (!val) {
                            this.ui.warning('Le mot de passe ne correspond pas.')
                        } else {
                            Promise.all([
                                this.af.auth.getAuth().auth.delete(),
                                this.af.database.object('/users/' + this.userService.userId).remove()
                            ]).then(() => {
                                this.authService.logout().then(() => {
                                    this.ui.success('Votre compte à bien été supprimé. Nous vous souhaitons bonne continuation.');
                                    this.router.navigateByUrl('/pages/login');
                                });
                            });
                        }
                    }).catch(() => {});
                }
            }).catch(() => {});
        }

    }
