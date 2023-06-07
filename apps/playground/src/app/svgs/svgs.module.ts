import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgsComponent } from './svgs.component';
import { BarComponent } from './bar/bar.component';


@NgModule({
  declarations: [
    SvgsComponent,
    BarComponent,

  ],
  imports: [
    CommonModule
  ],
  exports: [SvgsComponent,
  ],

})
export class SvgsModule { }
