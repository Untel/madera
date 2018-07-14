import { Component, OnInit, AfterViewInit } from '@angular/core';

import { ProjectService } from '../services/project.service';
import { Project } from '../models/project.model';
import { AngularFire } from 'angularfire2';

declare const $: any;
declare const swal: any;
@Component({
	templateUrl: './modules.component.html',
	styleUrls: ['./modules.component.css']
})
export class ModulesComponent implements OnInit, AfterViewInit {

	modules: any[] = [];

	constructor(private af: AngularFire) {}

	public ngOnInit() {
		this.af.database.list('/modules').subscribe((modules) => {
			this.modules = modules;
		});
	}

	public ngAfterViewInit() {
	}

	public removeProject(project: Project) {
		swal({
			title: 'Êtes vous sur de vouloir supprimer ce projet?',
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
			}
		}).catch(() => {});
	}

}
