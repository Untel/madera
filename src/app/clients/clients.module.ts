import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClientsRoutes } from './clients.routing';
import { NewClientComponent } from './new-client/new-client.component';
import { FormsModule } from '@angular/forms';
import { MdModule } from '../md/md.module';
import { ClientsComponent } from './clients.component';

@NgModule({
  imports: [
    FormsModule,
    MdModule,
    CommonModule,
    RouterModule.forChild(ClientsRoutes),
    CommonModule
  ],
  declarations: [ClientsComponent, NewClientComponent]
})
export class ClientsModule { }
