import { Component, OnInit, AfterViewInit } from '@angular/core';

import { ProjectService } from '../services/project.service';
import { Project } from '../models/project.model';

declare const $: any;
declare const swal: any;

console.log('Cmp start');
@Component({
	templateUrl: './projects.component.html',
	styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit, AfterViewInit {

	projects: Project[];

	constructor(private projectService: ProjectService) {}

	public ngOnInit() {
		this.projectService
			.getProjectsWithActors()
			.subscribe(projects => {
				this.projects = projects;
				this.initCards();
			});
	}

	public ngAfterViewInit() {
	}

	public removeProject(project: Project) {
		swal({
			title: 'Êtes vous sur de vouloir supprimer ce projet?',
			text: 'Cette action est définitive!',
			type: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Supprimer',
			cancelButtonText: 'Annuler, ',
			confirmButtonClass: 'btn btn-danger',
			cancelButtonClass: 'btn btn-warning',
			buttonsStyling: false
		}).then((confirmed) => {
			if (confirmed) {
				this.projectService.removeProject(project);
			}
		}).catch(() => {});
	}

	private initCards() {
		$('[data-header-animation="true"]').each(function(){
			const $fix_button = $(this);
			const $card = $(this).parent('.card');
			$card.find('.fix-broken-card').click(function(){
				console.log(this);
				const $header = $(this).parent().parent().siblings('.card-header, .card-image');
				$header.removeClass('hinge').addClass('fadeInDown');

				$card.attr('data-count', 0);

				setTimeout(function(){
					$header.removeClass('fadeInDown animate');
				}, 480);
			});

			$card.mouseenter(function(){
				const $this = $(this);
				const hover_count = parseInt($this.attr('data-count'), 10) + 1 || 0;
				$this.attr('data-count', hover_count);
				if (hover_count >= 20){
					$(this).children('.card-header, .card-image').addClass('hinge animated');
				}
			});

		});
	}


}
