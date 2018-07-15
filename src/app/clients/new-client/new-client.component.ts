import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { UiService } from '../../services/ui.service';
// import { AuthService } from '../../services/auth.service
import { AngularFire } from 'angularfire2';

import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

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
        gender: 'M',
        city: '',
        address: '',
        cp: '',
        confirmPassword: '',
    };

    get type(): String {
        return this.client.type;
    }

    set type(val) {
        this.client.type = val;
        setTimeout(() => $(".selectpicker").selectpicker(), 0);
    }

    constructor(private af: AngularFire, private router: Router, private route: ActivatedRoute, private ui: UiService, private auth: AuthService) { }

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
            this.submitting = false;
            return;
        }
        const obj = Object.assign({}, this.client);
        console.log('STEP 1')

        const handleError = (err, step) => {
            console.log('Error at step ' + step, err);
            this.submitting = false;
        }

        if (!this.auth.credentials) {
            this.ui.primary('Veuillez vous reconnecter pour affectuer cette action.')
            this.submitting = false;
            return;
        }

        this.af.auth.createUser({
            email: this.client.email,
            password: this.client.password,
        }).then((user) => {
            console.log('STEP 2')
            Promise.all([
                this.af.database
                    .object('/users/' + user.uid)
                    .set({
                        firstName: this.client.firstname,
                        lastName: this.client.lastname,
                        email: this.client.email,
                        phone: this.client.phone,
                        role: 'client'
                    }),
            ]).then(() => {
                console.log('STEP 3')
                this.auth.loginWithCredentials(this.auth.credentials.email, this.auth.credentials.password).then(() => {
                    console.log('STEP 4')

                    this.ui.success('Le client a bien été créé!');
                    // this.af.auth.getAuth().auth.sendEmailVerification();
                    this.router.navigateByUrl('/clients');
                    this.submitting = false;
                }).catch((err) => handleError(err, 1));
            }).catch((err) => handleError(err, 2));
        }).catch((err) => handleError(err, 3));
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
