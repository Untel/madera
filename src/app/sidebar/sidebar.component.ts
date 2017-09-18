import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ROUTES } from './sidebar-routes.config';
import { User } from '../models/user.model';

declare const $: any;
let sidebarTimer;

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
    styles: [
        `.sidebarpicture { 
            left: 0 !important;
            top: -100%;
        }`
    ]
})

export class SidebarComponent implements OnInit, AfterViewInit {
    public menuItems: any[];
    public user: User;

    constructor(private userService: UserService) {}

    isNotMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    }

    ngOnInit() {
        this.initSidebar();
        this.userService.user$.subscribe((_user) => {
            _user.displayName = _user.displayName || _user.firstName + ' ' + _user.lastName;
            this.user = _user;
        });
    }

    initSidebar() {
        let isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;
        if (isWindows) {
           // if we are on windows OS we activate the perfectScrollbar function
            let $sidebar = $('.sidebar-wrapper');
            $sidebar.perfectScrollbar();
        }
        this.menuItems = ROUTES.filter(menuItem => menuItem);
        isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;

        if (isWindows) {
           // if we are on windows OS we activate the perfectScrollbar function
           $('.sidebar .sidebar-wrapper, .main-panel').perfectScrollbar();
           $('html').addClass('perfect-scrollbar-on');
       } else {
           $('html').addClass('perfect-scrollbar-off');
       }
    }

    ngAfterViewInit() {
        // init Moving Tab after the view is initialisezé
        setTimeout(() => {
            if(mda.movingTabInitialised == false){
                mda.initMovingTab();
                mda.movingTabInitialised = true;
            }
        }, 10);
    }
}

const mda: any = {
    movingTab: '<div class="sidebar-moving-tab"/>',
    isChild: false,
    sidebarMenuActive: '',
    movingTabInitialised: false,
    distance: 0,

    setMovingTabPosition: function($currentActive){
       $currentActive = mda.sidebarMenuActive;
       mda.distance = $currentActive.parent().position().top - 10;

       if($currentActive.closest('.collapse').length != 0){
           let parent_distance = $currentActive.closest('.collapse').parent().position().top;
           mda.distance = mda.distance + parent_distance;
       }

       mda.moveTab();
    },
    initMovingTab: function(){
       mda.movingTab = $(mda.movingTab);

       mda.sidebarMenuActive = $('.sidebar .nav-container > .nav > li.active > a:not([data-toggle="collapse"]');

       if(mda.sidebarMenuActive.length != 0){
           mda.setMovingTabPosition(mda.sidebarMenuActive);
       } else {
           mda.sidebarMenuActive = $('.sidebar .nav-container .nav > li.active .collapse li.active > a');
           mda.isChild = true;
           this.setParentCollapse();
       }

       mda.sidebarMenuActive.parent().addClass('visible');

       let button_text = mda.sidebarMenuActive.html();
       mda.movingTab.html(button_text);

       $('.sidebar .nav-container').append(mda.movingTab);

       if (window.history && window.history.pushState) {
           $(window).on('popstate', function() {

               setTimeout(function(){
                   mda.sidebarMenuActive = $('.sidebar .nav-container .nav li.active a:not([data-toggle="collapse"])');

                   if(mda.isChild === true){
                       this.setParentCollapse();
                   }
                   clearTimeout(sidebarTimer);

                   const $currentActive = mda.sidebarMenuActive;

                   $('.sidebar .nav-container .nav li').removeClass('visible');

                   let $movingTab = mda.movingTab;
                   $movingTab.addClass('moving');

                   $movingTab.css('padding-left',$currentActive.css('padding-left'));
                   let button_text = $currentActive.html();

                   mda.setMovingTabPosition($currentActive);

                   sidebarTimer = setTimeout(function(){
                       $movingTab.removeClass('moving');
                       $currentActive.parent().addClass('visible');
                   }, 650);

                   setTimeout(function(){
                       $movingTab.html(button_text);
                   }, 10);
               },10);

           });
       }

       $('.sidebar .nav .collapse').on('hidden.bs.collapse', function () {
           const $currentActive = mda.sidebarMenuActive;

           mda.distance = $currentActive.parent().position().top - 10;

           if ($currentActive.closest('.collapse').length !== 0){
               const parent_distance = $currentActive.closest('.collapse').parent().position().top;
               mda.distance = mda.distance + parent_distance;
           }

           mda.moveTab();
       });

       $('.sidebar .nav .collapse').on('shown.bs.collapse', function () {
           let $currentActive = mda.sidebarMenuActive;

           mda.distance = $currentActive.parent().position().top - 10;

           if($currentActive.closest('.collapse').length !== 0){
               let parent_distance = $currentActive.closest('.collapse').parent().position().top;
               mda.distance = mda.distance + parent_distance;
           }

           mda.moveTab();
       });

       $('.sidebar .nav-container .nav > li > a:not([data-toggle="collapse"])').click(function(){
           mda.sidebarMenuActive = $(this);
           let $parent = $(this).parent();

           if(mda.sidebarMenuActive.closest('.collapse').length === 0){
               mda.isChild = false;
           }

           // we call the animation of the moving tab
           clearTimeout(sidebarTimer);

           let $currentActive = mda.sidebarMenuActive;

           $('.sidebar .nav-container .nav li').removeClass('visible');

           let $movingTab = mda.movingTab;
           $movingTab.addClass('moving');

           $movingTab.css('padding-left',$currentActive.css('padding-left'));
           let button_text = $currentActive.html();

           $currentActive = mda.sidebarMenuActive;
           mda.distance = $currentActive.parent().position().top - 10;

           if($currentActive.closest('.collapse').length !== 0){
               let parent_distance = $currentActive.closest('.collapse').parent().position().top;
               mda.distance = mda.distance + parent_distance;
           }

           mda.moveTab();

           sidebarTimer = setTimeout(function(){
               $movingTab.removeClass('moving');
               $currentActive.parent().addClass('visible');
           }, 650);

           setTimeout(function(){
               $movingTab.html(button_text);
           }, 10);
       });
    },
    setParentCollapse: function(){
       if(mda.isChild === true){
           let $sidebarParent = mda.sidebarMenuActive.parent().parent().parent();
           let collapseId = $sidebarParent.siblings('a').attr("href");

           $(collapseId).collapse("show");

           $(collapseId).collapse()
           .on('shown.bs.collapse', () => {
               mda.setMovingTabPosition();
           })
           .on('hidden.bs.collapse', () => {
               mda.setMovingTabPosition();
           });
       }
    },
    animateMovingTab: function(){
        clearTimeout(sidebarTimer);

        let $currentActive = mda.sidebarMenuActive;

        $('.sidebar .nav-container .nav li').removeClass('visible');

        let $movingTab = mda.movingTab;
        $movingTab.addClass('moving');

        $movingTab.css('padding-left',$currentActive.css('padding-left'));
        let button_text = $currentActive.html();

        mda.setMovingTabPosition($currentActive);

        sidebarTimer = setTimeout(function(){
            $movingTab.removeClass('moving');
            $currentActive.parent().addClass('visible');
        }, 650);

        setTimeout(function(){
            $movingTab.html(button_text);
        }, 10);
   },
   moveTab: function(){
       mda.movingTab.css({
           'transform': 'translate3d(0px,' + mda.distance + 'px, 0)',
           '-webkit-transform': 'translate3d(0px,' + mda.distance + 'px, 0)',
           '-moz-transform': 'translate3d(0px,' + mda.distance + 'px, 0)',
           '-ms-transform': 'translate3d(0px,' + mda.distance + 'px, 0)',
           '-o-transform': 'translate3d(0px,' + mda.distance + 'px, 0)'
       });
   }
};
