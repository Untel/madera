import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';
import { RouterModule } from '@angular/router';

import { ProjectsRoutes } from './projects.routing';
import { NewProjectComponent } from './new-project/new-project.component';
import { ProjectService } from '../services/project.service';
import { FormsModule } from '@angular/forms';

import { LyResizingCroppingImageModule } from 'alyle-ui/resizing-cropping-images';
import { ViewProjectComponent } from './view-project/view-project.component';
import { MdModule } from '../md/md.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MdModule,
    RouterModule.forChild(ProjectsRoutes),
    LyResizingCroppingImageModule
  ],
  declarations: [ProjectsComponent, NewProjectComponent, ViewProjectComponent],
  providers: [ ProjectService ]
})
export class ProjectsModule { }
