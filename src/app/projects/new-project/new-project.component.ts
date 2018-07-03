import { Subscription } from 'rxjs/Rx';
import { Component, OnDestroy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { UiService } from '../../services/ui.service';
// import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { ProjectService } from '../../services/project.service';
import { User, Project } from '../../models/all.model';

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
    
    commercials$: Observable<User[]>;
    commercials: User[] = [];
    commercialsSub: Subscription;
    
    clients$: Observable<User[]>;
    clients: User[] = [];
    clientsSub: Subscription;

    project: Project;
    
    @ViewChild('projectForm') form: NgForm;
    
    modulesTable = {
        headerRow: ['Module', 'Ref', 'Gamme', 'Quantité', 'Prix/U', 'Total'],
        dataRows: [
            { name: 'Mur extérieur bois/crépis', gamme: 'Éco.', reference: '912345', quantity: 0, price: 1599.99 },
            { name: 'Mur intérieur x', gamme: 'Éco.', reference: '894545', quantity: 0, price: 1285.99 },
            { name: 'Plafond x50m² bois/crépis', gamme: 'Éco.', reference: '454588', quantity: 0, price: 1000.99 },
        ]
    };
    
    constructor(private projectService: ProjectService, private userService: UserService, private router: Router, private route: ActivatedRoute) { }
    
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
        
        console.log('route', this.router);
        this.id = this.route.snapshot.params['id'];
    }
    
    ngAfterViewInit(): void {
        if (this.id) {
            console.log('Has param')
            this.projectService.getProject(this.id).subscribe((project: Project) => {
                if (project.$exists()) {
                    console.log('Project found', project);
                    console.log(this.form, this.form.form.controls, this.form.control.controls, this.form.controls['title'],
                    this.form.controls['title'],
                    this.form.controls['description'],
                    this.form.controls['commercials'],
                    this.form.controls['client'],
                    this.form.controls['reference']);
                    
                    setTimeout(() => {
                        this.project = project;
                        setTimeout(() => $(".selectClient").selectpicker(), 0);

                        // this.form.controls['title'].setValue(project.title);
                        // this.project['title'] = project.title;
                        // this.form.controls['description'].setValue(project.description);
                        // this.form.controls['commercials'].setValue(project.commercials);
                        // this.form.controls['client'].setValue(project.client);
                        // this.form.controls['reference'].setValue(project.reference);

                        // this.form.value['description'] = project.description;
                        // this.form.value['commercials'] = project.commercials;
                        // this.form.value['client'] = project.client;
                        // this.form.value['reference'] = project.reference;
                        // this.pictures = project.pictures;
                        // this.modulesTable.dataRows = project.modules;
                    }, 0)
                }
            });
        }
    }
    
    ngOnDestroy() {
        this.commercialsSub.unsubscribe();
        this.clientsSub.unsubscribe();
    }
    
    onSubmit(form) {
        console.log(form);
        const project: Project = {
            title: form.title,
            description: form.description,
            commercials: form.commercials,
            reference: form.reference,
            client: form.client,
            pictures: this.pictures,
            modules: this.modulesTable.dataRows,
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

}
