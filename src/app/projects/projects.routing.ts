import { Routes } from '@angular/router';

import { ProjectsComponent } from './projects.component';
import { NewProjectComponent } from './new-project/new-project.component';

import { ProjectResolver } from './new-project/project.resolver'; 

export const ProjectsRoutes: Routes = [
    {
        path: 'projects',
        component: ProjectsComponent,
    }, {
        path: 'new-project/:id',
        component: NewProjectComponent,
        resolve: {
            project: ProjectResolver
        }
    }
];