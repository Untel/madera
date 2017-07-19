import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

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
        user: User;
        photo;

        constructor(private auth: AuthService, private userService: UserService) { }

        ngOnInit() {
            this.userService.user$.subscribe((user) => {
                this.user = user;
            });
        }

        ngOnDestroy() {

        }

        onSubmit() {
            this.user = this.form.value;
            this.userService.updateUser(this.user).then(() => {

            }).catch(err => console.error("Cant save data", err));
        }

        updateProfilPicture() {
        }
    }
