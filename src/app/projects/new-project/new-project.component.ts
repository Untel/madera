import { 
	Component, 
	OnInit,
	ViewChild 
} from '@angular/core';
import { UiService } from '../../services/ui.service';
// import { AuthService } from '../../services/auth.service';
// import { UserService } from '../../services/user.service';
import { ProjectService } from '../../services/project.service';
import { User, Project } from '../../models/all.model';

import { ResizingCroppingImagesComponent as ResizingCroppingImages } from 'alyle-ui/resizing-cropping-images';

@Component({
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {
    // @ViewChild('projectForm') form;
    @ViewChild('_img') _img: ResizingCroppingImages;

    pictures: string[] = [];

    constructor(private projectService: ProjectService) { }

    ngOnInit() {
		this._img.sizeW = 400;
		this._img.sizeH = 300;
    }

    // ngOnDestroy() {

    // }

    onSubmit(form) {
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
