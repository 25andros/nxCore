import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';

import { FormsComponent } from './forms/forms.component';
import { DesignsComponent } from './designs.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { SubjectexampleComponent } from './subjectexample/subjectexample.component';
import { AlfaComponent } from './subjectexample/alfa/alfa.component';
import { BetComponent } from './subjectexample/bet/bet.component';
import { CompinteractComponent } from './compinteract/compinteract.component';
import { ArrayformsComponent } from './arrayforms/arrayforms.component';
import { RayformbuildComponent } from './rayformbuild/rayformbuild.component';
import { RestapiComponent } from './restapi/restapi.component';
import { Rayformbuild2Component } from './rayformbuild2/rayformbuild2.component';

@NgModule({
  declarations: [FormsComponent, DesignsComponent, RxjsComponent, SubjectexampleComponent, AlfaComponent, BetComponent, CompinteractComponent, ArrayformsComponent, RayformbuildComponent, RestapiComponent, Rayformbuild2Component],
  imports: [
    CommonModule,
  MaterialModule
  ],
  exports: [ DesignsComponent],
})
export class DesignsModule {}
