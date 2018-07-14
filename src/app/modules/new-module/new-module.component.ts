import { Subscription } from 'rxjs/Rx';
import { Component, OnDestroy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { UiService } from '../../services/ui.service';
// import { AuthService } from '../../services/auth.service
import { AngularFire } from 'angularfire2';

import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

declare var $: any;

@Component({
  templateUrl: './new-module.component.html',
  styleUrls: ['./new-module.component.css']
})
export class NewModuleComponent implements OnInit, OnDestroy, AfterViewInit {

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

    modulesTable = {
        headerRow: ['Module', 'Ref', 'Gamme', 'Quantité', 'Prix/U', 'Total'],
        dataRows: [
            { name: 'Mur extérieur bois/crépis', gamme: 'Éco.', reference: '912345', quantity: 0, price: 1599.99 },
            { name: 'Mur intérieur x', gamme: 'Éco.', reference: '894545', quantity: 0, price: 1285.99 },
            { name: 'Plafond x50m² bois/crépis', gamme: 'Éco.', reference: '454588', quantity: 0, price: 1000.99 },
        ]
    };

    constructor(private af: AngularFire, private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
    }

    ngAfterViewInit(): void {
        setTimeout(() => $(".selectpicker").selectpicker(), 0);
    }

    ngOnDestroy() {
    }

    onSubmit(form) {
        const obj = Object.assign({}, this.mod, {components: this.spe});
        this.af.database.list('/modules').push(obj);
    }

}
