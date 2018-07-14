import { Subscription } from 'rxjs';
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

    step = 0;

    steps = [
      'Signature du devis',
      "Obtention du permis de construire",
      "Ouverture du chantier",
      "Achèvement des fondations",
      "Achèvement des murs",
      "Mise hors d'eau / hors d'air",
      "Mise à jours des travaux d'équipements",
      "Remise des clefs",
    ];

    headerRow = ['Module', 'Ref', 'Gamme', 'Quantité', 'Prix/U', 'Total'];

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
      if (this.project) {
        return this.project.modules.reduce((prev, next) => {
          return prev + (next.quantity * next.price);
        }, 0);
      }
    }

    selectStep(i) {
      this.step = i + 1;
    }

}
