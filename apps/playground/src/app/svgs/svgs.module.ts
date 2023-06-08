import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgsComponent } from './svgs.component';
import { BarComponent } from './bar/bar.component';
import { PieComponent } from './pie/pie.component';
import { ScatterComponent } from './scatter/scatter.component';
import { MaterialModule } from '../material/material.module';
import { Bar2Component } from './bar2/bar2.component';
import { OpenComponent } from './open/open.component';


@NgModule({
  declarations: [
    SvgsComponent,
    BarComponent,
    PieComponent,
    ScatterComponent,
    Bar2Component,
    OpenComponent,

  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [SvgsComponent,
  ],

})
export class SvgsModule { }
