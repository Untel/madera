import { Routes } from '@angular/router';

import { ProjectsComponent } from './projects.component';
import { NewProjectComponent } from './new-project/new-project.component';
import { ViewProjectComponent } from './view-project/view-project.component';

export const ProjectsRoutes: Routes = [
    {
        path: '',
        component: ProjectsComponent,
    }, {
        path: 'new',
        component: NewProjectComponent
    }, {
        path: 'edit/:id',
        component: NewProjectComponent
    }, {
        path: 'view/:id',
        component: ViewProjectComponent
    }
];