import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ModulesRoutes } from './modules.routing';
import { NewModuleComponent } from './new-module/new-module.component';
import { FormsModule } from '@angular/forms';
import { MdModule } from '../md/md.module';
import { ModulesComponent } from './modules.component';

@NgModule({
  imports: [
    FormsModule,
    MdModule,
    CommonModule,
    RouterModule.forChild(ModulesRoutes),
    CommonModule
  ],
  declarations: [ModulesComponent, NewModuleComponent]
})
export class ModulesModule { }
