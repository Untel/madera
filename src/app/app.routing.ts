import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';

import { AdminGuard } from './layouts/admin/admin.guard';

export const AppRoutes: Routes = [
    {
      path: '',
      redirectTo: 'profil',
      pathMatch: 'full',
    },
    {
      path: '',
      component: AdminLayoutComponent,
      canActivate: [AdminGuard],
      children: [{
            path: 'projects',
            loadChildren: './projects/projects.module#ProjectsModule'
        },{
            path: 'modules',
            loadChildren: './modules/modules.module#ModulesModule'
        },{
            path: '',
            loadChildren: './userpage/user.module#UserModule'
        }]
    },{
      path: '',
      component: AuthLayoutComponent,
      children: [{
        path: 'pages',
        loadChildren: './pages/pages.module#PagesModule'
      }]
    }
];
