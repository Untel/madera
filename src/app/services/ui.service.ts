import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { AuthService } from './auth.service';

declare var $: any;

@Injectable()
export class UiService {

    // mainColor: string;
    // secondColor: string;

        // var type = ['info', 'success', 'warning', 'danger', 'rose', 'primary'];
        // var icon = "notifications";
    constructor(private af: AngularFire, private auth: AuthService) {
    }

    success(message) {
        this.notify(message, 'check', 'success');
    }

    danger(message) {
        this.notify('<b>Erreur ! </b>' + message, 'add_alert', 'danger');
    }

    primary(message) {
        this.notify(message, 'add_alert', 'primary');
    }

    warning(message) {
        this.notify(message, 'add_alert', 'warning');
    }

    notify(message, icon, type) {
        $.notify({
            icon,
            message
        }, {
            type,
            timer: 3000,
            placement: {
                from: 'bottom',
                align: 'right'
            }
        });
    }

}
