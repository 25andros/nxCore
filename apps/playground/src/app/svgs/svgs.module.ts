import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgsComponent } from './svgs.component';


@NgModule({
  declarations: [
    SvgsComponent,

  ],
  imports: [
    CommonModule
  ],
  exports: [SvgsComponent,
  ],

})
export class SvgsModule { }
