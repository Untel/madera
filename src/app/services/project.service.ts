import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Project } from '../models/project.model';

import { FirebaseListObservable } from 'angularfire2';

@Injectable()
export class ProjectService {

	ref: FirebaseListObservable<Project[]>;

	constructor(private af: AngularFire) {
		this.ref = this.af.database.list('/projects');
		console.log(this.ref);
	}

	createProject(project: Project) {
		console.log(this.ref);
		this.ref
			.push(project)
			.then(p => console.log('Project added', p))
			.catch(e => console.error('Error ', e));
	}

}
