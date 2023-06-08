import { NgModule } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

//forms
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule,FormsModule} from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSliderModule} from '@angular/material/slider';

const MaterialComponents = [
  MatInputModule,
  FormsModule,
  MatFormFieldModule,
  ReactiveFormsModule,

  MatButtonModule,
  MatCardModule,

  MatSlideToggleModule,
  MatSnackBarModule,
  MatRadioModule,
  MatCheckboxModule,
  MatToolbarModule ,
  MatIconModule,
  MatSliderModule,

]


@NgModule({
  declarations: [],
  imports: [MaterialComponents],
  exports: [MaterialComponents],
})
export class MaterialModule { }
