import { UiService } from './services/ui.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';

import {
    APP_BASE_HREF,
    LocationStrategy,
    Location,
    HashLocationStrategy
} from '@angular/common';


import { environment } from 'environments/environment';

import { AppComponent } from './app.component';

// Modules
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';

// Mains cmps
import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';

// Others
import { AppRoutes } from './app.routing';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { AdminGuard } from './layouts/admin/admin.guard';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/distinct';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/observable/forkJoin';


@NgModule({
    imports:      [
        BrowserModule,
        FormsModule,
        RouterModule.forRoot( AppRoutes ),
        AngularFireModule.initializeApp( environment.firebase ),
        HttpModule,
        SidebarModule,
        NavbarModule,
        FooterModule,
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        AuthLayoutComponent,
    ],
    providers: [
        AuthService,
        UserService,
        UiService,
        AdminGuard,
    ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
