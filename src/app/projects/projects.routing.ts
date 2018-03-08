import { Routes } from '@angular/router';

import { ProjectsComponent } from './projects.component';
import { NewProjectComponent } from './new-project/new-project.component';
import { ViewProjectComponent } from './view-project/view-project.component';

export const ProjectsRoutes: Routes = [
    {
        path: 'projects',
        component: ProjectsComponent,
    }, {
        path: 'new-project',
        component: NewProjectComponent
    }, {
        path: 'view-project/:id',
        component: ViewProjectComponent
    }
];