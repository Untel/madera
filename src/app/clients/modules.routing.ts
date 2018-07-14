import { Routes } from '@angular/router';
import { ModulesComponent } from './modules.component';
import { NewModuleComponent } from './new-module/new-module.component';

export const ModulesRoutes: Routes = [
    {
        path: '',
        component: ModulesComponent,
    },
    {
        path: 'new',
        component: NewModuleComponent
    },
    // {
    //     path: 'edit/:id',
    //     component: NewProjectComponent
    // }, {
    //     path: 'view/:id',
    //     component: ViewProjectComponent
    // }
];
