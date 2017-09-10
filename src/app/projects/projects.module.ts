import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';
import { RouterModule } from '@angular/router';

import { ProjectsRoutes } from './projects.routing';
import { NewProjectComponent } from './new-project/new-project.component';
import { ProjectService } from '../services/project.service';
import { FormsModule } from '@angular/forms';

import { LyResizingCroppingImageModule } from 'alyle-ui/resizing-cropping-images';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(ProjectsRoutes),
    LyResizingCroppingImageModule
  ],
  declarations: [ProjectsComponent, NewProjectComponent],
  providers: [ ProjectService ]
})
export class ProjectsModule { }
