import { ProjectService } from '../../services/project.service';
import { Observable } from 'rxjs/Rx';
import { UserService } from '../../services/user.service';
import { Project } from '../../models/project.model';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';



export class ProjectResolver implements Resolve<Project> {

    constructor(private projectService: ProjectService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Project> {
        const idProject = route.params['id'];

        if (idProject) {
            return this.projectService.getProject(idProject);
        } else {
            return Observable.empty<Project>();
        }
    }
}