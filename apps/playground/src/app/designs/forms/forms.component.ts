import { Component } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject, concat, takeUntil } from 'rxjs';

@Component({
  selector: 'gibbsltd-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent {

  unsubscribe$ = new Subject<void>();

  constructor(private fb: FormBuilder,
             private _snack:MatSnackBar) {
  }



  //Form Builder
  itemValues = this.fb.group({
    nameProd: ['Drill',[Validators.required,Validators.minLength(5)]],
    priceProd: ['75',]
  } );

  name(){return this.itemValues.value.nameProd;}
  price(){return this.itemValues.value.priceProd;}

  submitted(){
    alert(`You submitted : ${this.name()} and ${this.price()}`);

  }

  //form validities

  nameValidity(){
    return (this.name.length<4 ||this.name.length>25 )? true : false;
  }


  pass$=this.itemValues.statusChanges
  .pipe(takeUntil(this.unsubscribe$))
  .subscribe((x)=>{
  if(x=="INVALID"){

  this._snack.open("needs to be valid!","close",{duration: 3000})
}
  });



  ngOnDestroy():void{

    console.log(`Close of the this page.`);
    this.unsubscribe$.next();
    this.unsubscribe$.complete();

  }

}
