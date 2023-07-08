import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Product,SellingPoint } from '../../classes/product';

@Component({
  selector: 'gibbsltd-arrayforms',
  templateUrl: './arrayforms.component.html',
  styleUrls: ['./arrayforms.component.css']
})
export class ArrayformsComponent implements OnInit {

  constructor(private _fb: FormBuilder) { }

  productForm: FormGroup = this._fb.group({});

  ngOnInit() {
      this.productForm = this._fb.group({
      title: [],
      selling_points: this._fb.array([this._fb.group({point:''})])
    })
  }


  //accessor f'x
  get sellingPoints() {
    return this.productForm.get('selling_points') as FormArray
  }

  addSellingPoint() {
    this.sellingPoints.push(this._fb.group({point:''}));
  }

  deleteSellingPoint(index:any) {
    this.sellingPoints.removeAt(index);
  }
  //helpful
  //https://blog.karmacomputing.co.uk/angular-6-dynamically-add-rows-reactive-forms-how-to/

 }

