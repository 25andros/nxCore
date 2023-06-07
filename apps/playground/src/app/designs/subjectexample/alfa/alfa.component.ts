import { Component } from '@angular/core';
import { DatamoveService } from '../../../services/datamove.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'gibbsltd-alfa',
  templateUrl: './alfa.component.html',
  styleUrls: ['./alfa.component.css']
})
export class AlfaComponent {


  constructor(private dataMove:DatamoveService,
              private fb:FormBuilder
             ){  }

  //Form Builder
  inputsValues = this.fb.group({
    alphaIn: [2500],
  } );

  //getter
  timevalue(){
    return this.inputsValues.value.alphaIn;
  }

  roundTimeValue=()=>{
    return this.inputsValues.value.alphaIn;
  }

  doTheMove(){
    this.dataMove.dataSend(this.timevalue());
  }

}
