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

    pictures: string[] = [];

    commercials$: Observable<User[]>;
    commercials: User[] = [];
    commercialsSub: Subscription;

    customers$: Observable<User[]>;
    customers: User[] = [];
    customersSub: Subscription;

    constructor(private projectService: ProjectService, private userService: UserService) { }

    ngOnInit() {
		this._img.sizeW = 400;
        this._img.sizeH = 300;

        this.commercialsSub = this.userService
            .getCommercials()
            .subscribe(com => {
                console.log('COMM', com[0]);
                this.commercials = com;
                console.log(this.commercials, 'this')
                setTimeout(() => $(".selectCommercial").selectpicker(), 0);
            });

        this.customersSub = this.userService
            .getCustomers()
            .subscribe(cus => {
                this.customers = cus;
                setTimeout(() => $(".selectCustomer").selectpicker(), 0);
            });

        setTimeout(() => {
            $('.bootstrap-select.btn-group.show-tick .dropdown-menu li.selected a span.check-mark')
                .css('background-color', 'red');
        }, 4000);
    }

    ngOnDestroy() {
        this.commercialsSub.unsubscribe();
        this.customersSub.unsubscribe();
    }

    onSubmit(form) {
        console.log(form);
        const project: Project = {
            title: form.title,
            description: form.description,
            pictures: this.pictures
        };
        this.projectService.createProject(project);
    }

   	addPicture() {
		const b64img = this._img.imgCrop;

		this.pictures.push(b64img);

        this._img.img = null;
		this._img.imgCrop = null;
    }

    removePicture(index) {
        this.pictures.splice(index, 1);
    }

    onFileChange($event) {
		this._img.imgChange($event);
    }

}
