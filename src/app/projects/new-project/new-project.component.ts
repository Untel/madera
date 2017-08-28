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
import { ResizingCroppingImagesComponent } from 'angular2-resizing-cropping-image';
@Component({
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {
    @ViewChild('projectForm') form;
    @ViewChild('_img') _img: ResizingCroppingImagesComponent;
	
	newProject: Project = {
		title: '',
		description: '',
		pictures: []
	};

    constructor(projectService: ProjectService) { }

    ngOnInit() {
		this._img.sizeW = 400;
		this._img.sizeH = 300;
    }

    ngOnDestroy() {

    }

    onSubmit() {

    }

   	addPicture() {
		const b64img = this._img.imgCrop;

		this.newProject.pictures.push(b64img);

		this._img.img = null;
    }

    onFileChange($event) {
		this._img.imgChange($event);
    }

}
