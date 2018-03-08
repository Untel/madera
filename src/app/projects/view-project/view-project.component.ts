import { Subscription } from 'rxjs/Rx';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UiService } from '../../services/ui.service';
// import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { ProjectService } from '../../services/project.service';
import { User, Project } from '../../models/all.model';

import { ResizingCroppingImagesComponent as ResizingCroppingImages } from 'alyle-ui/resizing-cropping-images';

import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';

declare var $: any;

@Component({
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css']
})
export class ViewProjectComponent implements OnInit, OnDestroy {

    project$: Observable<Project>;
    project: Project = null;

    modulesTable = {
      headerRow: ['Module', 'Ref', 'Quantité', 'Prix/U', 'Total'],
      dataRows: [
          ['Mur extérieur bois/crépis', '912345', 8, 599.99],
          ['Mur intérieur x', '894545', 4, 285.99],
          ['Plafond x50m² bois/crépis', '454588', 5, 351.99],
      ]
   };

    constructor(private projectService: ProjectService, private userService: UserService, private route: ActivatedRoute) { }

    ngOnInit() {
      this.route.params.subscribe((params) => {
        console.log('GETTING PROJECT FOR ID: ', params);
        this.project$ = this.projectService.getProject(params['id']);
      });

      this.project$.subscribe((project) => {
        this.project = project;
      });
    }

    ngOnDestroy() {
    }

    getPrice() {
      return this.modulesTable.dataRows.reduce((prev, next) => {
        const a: number = next[2] as number;
        const b: number = next[3] as number;
        return prev + (a * b);
      }, 0);
    }

}
