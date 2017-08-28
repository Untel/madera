import { Component, OnInit, AfterViewInit } from '@angular/core';

declare var $: any;

console.log('Cmp start');
@Component({
	templateUrl: './projects.component.html',
	styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit, AfterViewInit {

	constructor() {

		console.log('Cmp constr');
		
	}

	public ngOnInit() {
		console.log('Cmp constr');
	}

	public ngAfterViewInit() {

		$('[data-header-animation="true"]').each(function(){
			var $fix_button = $(this);
			var $card = $(this).parent('.card');
			$card.find('.fix-broken-card').click(function(){
				console.log(this);
				var $header = $(this).parent().parent().siblings('.card-header, .card-image');
				$header.removeClass('hinge').addClass('fadeInDown');

				$card.attr('data-count',0);

				setTimeout(function(){
					$header.removeClass('fadeInDown animate');
				},480);
			});

			$card.mouseenter(function(){
				var $this = $(this);
				var hover_count = parseInt($this.attr('data-count'), 10) + 1 || 0;
				$this.attr("data-count", hover_count);
				if (hover_count >= 20){
					$(this).children('.card-header, .card-image').addClass('hinge animated');
				}
			});

		});
		
	}


}
