import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { UiService } from '../../services/ui.service';
// import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { ProjectService } from '../../services/project.service';
import { User, Project } from '../../models/all.model';

import { AngularFire } from 'angularfire2'

import { ResizingCroppingImagesComponent as ResizingCroppingImages } from 'alyle-ui/resizing-cropping-images';

import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

declare var $: any;

@Component({
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit, OnDestroy, AfterViewInit {
    // @ViewChild('projectForm') form;
    @ViewChild('_img') _img: ResizingCroppingImages;

    id: number = null;
    pictures: string[] = [];

    submitting = false;

    commercials$: Observable<User[]>;
    commercials: User[] = [];
    commercialsSub: Subscription;

    clients$: Observable<User[]>;
    clients: User[] = [];
    clientsSub: Subscription;

    project: Project = {
        title: '',
        description: '',
        commercials: [],
        reference: '',
        client: '',
        pictures: [],
        modules: [],
    };

    modules: any = [];

    @ViewChild('projectForm') form: NgForm;

    modulesTable = {
        headerRow: ['Module', 'Ref', 'Gamme', 'Quantité', 'Prix/U', 'Total'],
        dataRows: []
    };

    constructor(
        private af: AngularFire,
        private projectService: ProjectService,
        private userService: UserService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this._img.sizeW = 483.33;
        this._img.sizeH = 362;

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

        this.af.database.list('/modules').subscribe((modules) => {
            this.modules = modules;
        });

        console.log('route', this.router);
        this.id = this.route.snapshot.params['id'];
    }

    ngAfterViewInit(): void {
        if (this.id) {
            console.log('Has param')
            this.projectService.getProject(this.id).subscribe((project: Project) => {
                if (project.$exists()) {
                    this.form.controls['title'],
                    this.form.controls['description'],
                    this.form.controls['commercials'],
                    this.form.controls['client'],
                    this.form.controls['reference'];
                    setTimeout(() => {
                        this.project = project;
                        setTimeout(() => $(".selectClient").selectpicker(), 0);
                    }, 0)
                }
            });
        }
    }

    ngOnDestroy(): void {
        this.commercialsSub.unsubscribe();
        this.clientsSub.unsubscribe();
    }

    onSubmit(form) {
        this.submitting = true;
        const project: Project = {
            title: form.title,
            description: form.description,
            commercials: form.commercials,
            reference: form.reference,
            client: form.client,
            pictures: this.pictures,
            modules: this.modulesTable.dataRows,
        };
        this.projectService.createProject(project)
            .then(() => this.router.navigateByUrl('/projects'))
            .catch(() => this.submitting = false);
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

    getPrice() {
        return this.modulesTable.dataRows.reduce((prev, next) => {
          return prev + (next.quantity * next.price);
        }, 0);
    }

    add(ref, amount) {
        if (amount < 0 && ref.quantity <= 0) {
            return;
        }
        ref.quantity += amount;
    }


    addModule(mod) {
        this.modulesTable.dataRows.push(Object.assign({}, {
            name: mod.name,
            description: mod.description,
            price: mod.price,
            type: mod.type,
            reference: mod.reference,
            gamme: mod.gamme,
            quantity: 1
        }));
    }

    deleteModule(index) {
        this.modulesTable.dataRows.splice(index, 1);
    }


}
