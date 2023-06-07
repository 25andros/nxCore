import { Component } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'gibbsltd-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent {


  constructor(private fb: FormBuilder) {
  }



  //Form Builder
  itemValues = this.fb.group({
    nameProd: ['Drill',[Validators.required,Validators.minLength(5)]],
    priceProd: ['',]
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

  grabINT(){

/*

  const request$ = new Observable(observer => {
    fetch(https://backside-1ad41-default-rtdb.firebaseio.com/)
    .then(response => {
      return response.ok ? response.text() : '';
    })
    .then(result => {
      if (result) {
        observer.next(result);
        observer.complete();
      } else {
        observer.error('An error has occured');
      }
    });
  });

  */
  }






}
