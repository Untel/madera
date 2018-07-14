import { Component, OnInit, AfterViewInit } from '@angular/core';

import { ProjectService } from '../services/project.service';
import { Project } from '../models/project.model';
import { AngularFire } from 'angularfire2';
import { UiService } from '../services/ui.service';

declare const $: any;
declare const swal: any;
@Component({
	templateUrl: './modules.component.html',
	styleUrls: ['./modules.component.css']
})
export class ModulesComponent implements OnInit, AfterViewInit {

	modules: any[] = [];

	constructor(private af: AngularFire, private ui: UiService) {}

	public ngOnInit() {
		this.af.database.list('/modules').subscribe((modules) => {
			this.modules = modules;
		});
	}

	public ngAfterViewInit() {
	}

	public removeModule(mod) {
		swal({
			title: 'Êtes vous sur de vouloir supprimer ce module?',
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
				this.af.database.object(`/modules/${mod.$key}`)
					.remove()
					.then(p => this.ui.success('Le module à bien été supprimé!'))
					.catch(e => this.ui.danger(`Le module n'à pas pu être supprimé`));
			}
		}).catch(() => {});
	}

}
