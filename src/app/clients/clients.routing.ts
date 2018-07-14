import { Routes } from '@angular/router';
import { ClientsComponent } from './clients.component';
import { NewClientComponent } from './new-client/new-client.component';

export const ClientsRoutes: Routes = [
    {
        path: '',
        component: ClientsComponent,
    },
    {
        path: 'new',
        component: NewClientComponent
    },
];
