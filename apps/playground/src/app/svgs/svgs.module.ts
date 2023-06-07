import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgsComponent } from './svgs.component';
import { BarComponent } from './bar/bar.component';
import { PieComponent } from './pie/pie.component';
import { ScatterComponent } from './scatter/scatter.component';


@NgModule({
  declarations: [
    SvgsComponent,
    BarComponent,
    PieComponent,
    ScatterComponent,

  ],
  imports: [
    CommonModule
  ],
  exports: [SvgsComponent,
  ],

})
export class SvgsModule { }
