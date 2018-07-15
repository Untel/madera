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
import { FirebaseObjectObservable, AngularFire } from 'angularfire2';

declare var $: any;

@Component({
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css']
})
export class ViewProjectComponent implements OnInit, OnDestroy {

    project$: FirebaseObjectObservable<Project>;
    project: Project = null;
    client;
    commercial;
    

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

    constructor(
      private projectService: ProjectService,
      private userService: UserService,
      private route: ActivatedRoute,
      private ui: UiService,
      private af: AngularFire
    ) { }

    ngOnInit() {
      this.route.params.subscribe((params) => {
        console.log('GETTING PROJECT FOR ID: ', params);
        this.project$ = this.projectService.getProject(params['id']);
      });

      this.project$.subscribe((project) => {
        this.project = project;
        
        this.userService.getUser(project.client).subscribe((client) => {
          this.client = client;
        });
        this.userService.getUser(project.commercials[0]).subscribe((commercial) => {
          this.commercial = commercial;
        });
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
      const step = i + 1;
      this.project$.update({ step }).then(() => {
        this.ui.success('L\'étape projet à bien été débloqué');
      });
    }

    print() {
      window.print();
    }

}
