import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'gibbsltd-rayformbuild2',
  templateUrl: './rayformbuild2.component.html',
  styleUrls: ['./rayformbuild2.component.css']
})
export class Rayformbuild2Component implements OnInit{
  constructor(private _fb: FormBuilder) {
  }

        //ray: number[] = []
        ray: {[i:number]:number}[]=[]
        //ray=[]


        ngOnInit(){
          for(let i=0;i<this.rtQt();i++){this.addSpoke2()}
        }

      rimInput = this._fb.group({
        qt:6,
        preSet:120,
        //ray: {[i:number]:number}[]=[]
        //ray:[],dd
      })

      dynamic = this._fb.group({
        numOfSpokes:this._fb.array([ ])
        //numOfSpokes:this._fb.array([this._fb.group({i:rtPreSet()}) ])
      })

      //factory fx's

      //rtRay(){return this.rimInput.value.ray}
      rtQt() {return this.rimInput.value.qt||0}
      rtPreSet() {return this.rimInput.value.preSet||0}

    get spokeQt(){ return this.dynamic.get('numOfSpokes') as FormArray }


    addSpoke(){ return this.spokeQt.push(
      this._fb.group({i:this.rimInput.value.preSet})
    )}

    addSpoke2(){

      const xVal=this.rtPreSet()*2
      const yVal=this.rtPreSet()*.5

    return this.spokeQt.push(
      this._fb.group({i:this.rtPreSet(),x:xVal,y:yVal})
    )}


    rmSpoke(index:any){
      this.spokeQt.removeAt(index)
}

  cngValue(){
    this.rimInput.value.qt=7
    console.log(this.spokeQt.controls.values)
  }

  mkeRay(){
    const bro=Array(this.rtQt()||0).fill({})
    .map((x,i)=>x={[i]:this.rtPreSet()})
    //  // @ts-ignore

    //this.rimInput.value.ray=bro
    this.ray=bro

    console.log('mke')
    console.log(this.dynamic.value.numOfSpokes)
  }


}
