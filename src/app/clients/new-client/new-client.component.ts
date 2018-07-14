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
    public mod: any = {
        name: '',
        price: 0,
        reference: '',
        gamme: '',
        description: '',
        type: null,
    };

    public spe: any = {};

    get type(): String {
        return this.mod.type;
    }

    set type(val) {
        this.mod.type = val;
        this.spe = {};
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
        const obj = Object.assign({}, this.mod, {components: this.spe});
        this.af.database.list('/modules')
            .push(obj)
			.then(p => {
                this.submitting = false;
                this.ui.success('Le module a bien été supprimé!');
                this.router.navigateByUrl('/modules');
            })
			.catch(e => {
                this.submitting = false;
                this.ui.danger(`Le module n'a pas pu être supprimé`);
            });
    }

}
