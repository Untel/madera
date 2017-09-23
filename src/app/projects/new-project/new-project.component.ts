import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UiService } from '../../services/ui.service';
// import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { ProjectService } from '../../services/project.service';
import { User, Project } from '../../models/all.model';

import { ResizingCroppingImagesComponent as ResizingCroppingImages } from 'alyle-ui/resizing-cropping-images';

import { Observable } from 'rxjs/Observable';

declare var $: any;

@Component({
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit, OnDestroy {
    // @ViewChild('projectForm') form;
    @ViewChild('_img') _img: ResizingCroppingImages;

    project$: Observable<Project>;
    project: Project;
    projectSub: Subscription;

    commercials$: Observable<User[]>;
    commercials: User[] = [];
    commercialsSub: Subscription;

    clients$: Observable<User[]>;
    clients: User[] = [];
    clientsSub: Subscription;

    idProject: string;
    mode: string;

    constructor(
        private projectService: ProjectService,
        private userService: UserService,
        private route: ActivatedRoute
    ) {
        // this.idProject = this.route.snapshot.params['id'] || null;
        this.project$ = this.route.snapshot.data['project'];

        if (this.idProject) {
            this.mode = 'view';
        } else {
            this.mode = 'new';
        }
    }

    ngOnInit() {
		this._img.sizeW = 483.33;
        this._img.sizeH = 362;

        if (this.mode !== 'new' && this.idProject) {
            this.projectSub = this.project$
                .subscribe(project => {
                    this.project = project;
                    setTimeout(() => $(".selectpicker").selectpicker(), 0);
                });
        }

        this.commercialsSub = this.userService
            .getCommercials()
            .subscribe(com => {
                this.commercials = com;
                setTimeout(() => $(".selectCommercial").selectpicker(), 0);
            });

        this.clientsSub = this.userService
            .getClients()
            .subscribe(cus => {
                this.clients = cus;
                setTimeout(() => $(".selectClient").selectpicker(), 0);
            });
    }

    ngOnDestroy() {
        this.commercialsSub.unsubscribe();
        this.clientsSub.unsubscribe();
        this.projectSub.unsubscribe();
    }

    onSubmit(form) {
        console.log(form);
        const project: Project = {
            title: form.title,
            description: form.description,
            commercials: form.commercials,
            client: form.client,
            pictures: this.project.pictures
        };
        this.projectService.createProject(project);
    }

   	addPicture() {
		const b64img = this._img.imgCrop;

		this.project.pictures.push(b64img);

        this._img.img = null;
		this._img.imgCrop = null;
    }

    removePicture(index) {
        this.project.pictures.splice(index, 1);
    }

    onFileChange($event) {
		this._img.imgChange($event);
    }

}
