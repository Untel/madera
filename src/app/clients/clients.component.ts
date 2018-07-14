import { Component, OnInit, AfterViewInit } from '@angular/core';

import { ProjectService } from '../services/project.service';
import { Project } from '../models/project.model';
import { AngularFire } from 'angularfire2';
import { UiService } from '../services/ui.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

declare const $: any;
declare const swal: any;
@Component({
	templateUrl: './clients.component.html',
	styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit, AfterViewInit {

	clients: User[] = [];

	constructor(private af: AngularFire, private ui: UiService, private userService: UserService) {}

	public ngOnInit() {
		this.userService.getClients().subscribe((clients: User[]) => {
			this.clients = clients;
		});
	}

	public ngAfterViewInit() {
	}

	public removeClient(client) {
		swal({
			title: 'Êtes vous sur de vouloir supprimer ce client?',
			text: 'Cette action est définitive!',
			type: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Supprimer',
			cancelButtonText: 'Annuler, ',
			confirmButtonClass: 'btn btn-danger',
			cancelButtonClass: 'btn btn-warning',
			buttonsStyling: false
		}).then((confirmed) => {
			if (confirmed) {
				this.af.database.object(`/users/${client.$key}`)
					.remove()
					.then(p => this.ui.success('Le client à bien été supprimé!'))
					.catch(e => this.ui.danger(`Le client n'à pas pu être supprimé`));
			}
		}).catch(() => {});
	}

}
