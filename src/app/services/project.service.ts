import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Project } from '../models/project.model';

@Injectable()
export class ProjectService {

	constructor(private af: AngularFire) { }

	createProject(project: Project) {
		console.log('PROJECT: ', project);
	}

}
