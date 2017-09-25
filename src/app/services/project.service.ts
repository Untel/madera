import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Project } from '../models/project.model';

import { UiService } from './ui.service';
import { UserService } from './user.service';

import { FirebaseListObservable } from 'angularfire2';

@Injectable()
export class ProjectService {

	ref: FirebaseListObservable<Project[]>;

	constructor(private af: AngularFire, private userService: UserService, private ui: UiService) {
		this.ref = this.af.database.list('/projects');
	}

	createProject(project: Project): Promise<Project> {
		return this.ref
			.push(project)
			.then(p => this.ui.success('Le projet à bien été ajouté!'))
			.catch(e => this.ui.danger(`Le projet n'à pas pu être ajouté`));
	}

	removeProject(project: Project): void {
		this.af.database.object(`/projects/${project.$key}`)
			.remove()
			.then(p => this.ui.success('Le projet à bien été supprimé!'))
			.catch(e => this.ui.danger(`Le projet n'à pas pu être supprimé`));
	}

	getProject(idProject: String): Observable<Project> {
		return this.af.database.object(`/projects/${idProject}`);
	}

	getProjects(): Observable<Project[]> {
		return this.ref;
	}

	getProjectsWithActors(): Observable<Project[]> {
		return Observable
			.combineLatest(
				this.getProjects(),
				this.userService.getUsers(),
			)
			.map( ([projects, users]) => {
				return projects.map( project => {
					project.$commercials = [];

					if (project.commercials) {
						project.commercials.forEach( commercialId => {
							const userToPush = users.find(user => user.$key === commercialId );
							if (userToPush) {
								project.$commercials.push(userToPush);
							}
						});
					}
					if (project.client) {
						project.$client = users.find(user => user.$key === project.client );
					}
					return project;
				});
			})
			.do((one) => console.log('getProjectsWithActors: ', one));
	}

}
