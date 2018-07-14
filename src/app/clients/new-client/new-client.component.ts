import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { UiService } from '../../services/ui.service';
// import { AuthService } from '../../services/auth.service
import { AngularFire } from 'angularfire2';

import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

declare var $: any;

@Component({
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.css']
})
export class NewClientComponent implements OnInit, OnDestroy, AfterViewInit {

    submitting = false;
    public client: any = {
        firstname: '',
        lastname: '',
        email: '',
        telephone: '',
        password: '',
        confirmPassword: '',
    };

    get type(): String {
        return this.client.type;
    }

    set type(val) {
        this.client.type = val;
        setTimeout(() => $(".selectpicker").selectpicker(), 0);
    }

    constructor(private af: AngularFire, private router: Router, private route: ActivatedRoute, private ui: UiService) { }

    ngOnInit() {
    }

    ngAfterViewInit(): void {
        setTimeout(() => $(".selectpicker").selectpicker(), 0);
    }

    ngOnDestroy() {
    }

    onSubmit(form) {
        this.submitting = true;

        if (this.client.password !== this.client.confirmPassword) {
            this.ui.danger('Les mots de passe sont différents');
            return;
        }
        const obj = Object.assign({}, this.client);
        this.af.auth.createUser({
            email: this.client.email,
            password: this.client.password,
        }).then((user) => {
            Promise.all([
                this.af.database
                    .object('/user/' + user.uid)
                    .set({
                        firstname: this.client.firstname,
                        lastname: this.client.lastname,
                        email: this.client.email,
                        phone: this.client.phone,
                    }),
                this.af.auth.getAuth().auth.sendEmailVerification()
            ]).then(() => {
                this.ui.success('Le client a bien été créé!');
                // this.af.auth.getAuth().auth.sendEmailVerification();
                this.router.navigateByUrl('/clients');
                this.submitting = false;
            }).catch(() => this.submitting = false);
        }).catch(() => this.submitting = false);
        // this.af.database.list('/client')
        //     .push(obj)
		// 	.then(p => {
        //         this.submitting = false;
        //         this.ui.success('Le client a bien été supprimé!');
        //         this.router.navigateByUrl('/clientules');
        //     })
		// 	.catch(e => {
        //         this.submitting = false;
        //         this.ui.danger(`Le client n'a pas pu être supprimé`);
        //     });
    }

}
