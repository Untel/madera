import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LyResizingCroppingImageModule } from 'angular2-resizing-cropping-image';
import { UserComponent } from './user.component';
import { UserRoutes } from './user.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(UserRoutes),
        FormsModule,
        LyResizingCroppingImageModule
    ],
    declarations: [UserComponent]
})

export class UserModule {}
