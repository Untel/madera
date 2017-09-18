import { Routes } from '@angular/router';

import { ProjectsComponent } from './projects.component';
import { NewProjectComponent } from './new-project/new-project.component';

export const ProjectsRoutes: Routes = [
    {
        path: 'projects',
        component: ProjectsComponent,
    }, {
        path: 'new-project/:id',
        component: NewProjectComponent
    }
];