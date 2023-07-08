import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'gibbsltd-restapi',
  templateUrl: './restapi.component.html',
  styleUrls: ['./restapi.component.css']
})
export class RestapiComponent {

  //api: https://backside-1ad41-default-rtdb.firebaseio.com/

  //reactive form controls

  constructor(private _fb: FormBuilder, private _ht:HttpClient,  )  {  }
  allDatae=[]

  unsubscribe$ = new Subject<void>();

  itemDetails= this._fb.group({
    name:'LeafOne'||'',
    desc:'A leafy metal'||'',
    value:15||0,
  })

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }



  //post to firebase

  addDatae(){
    console.log(this.itemDetails.value)
  }

  addDataeNow(){
    console.log(this.itemDetails)

  }

  addDataeIn(sku:any){
    //console.log(sku)
    console.log('post')
    this._ht.post('https://backside-1ad41-default-rtdb.firebaseio.com/sku.json',sku)
    .pipe(takeUntil(this.unsubscribe$))
      .subscribe(x=> {

      console.log(x)

    })
  }

  grabDatae(){

    this._ht.get('https://backside-1ad41-default-rtdb.firebaseio.com/sku.json')
      /*
      .pipe(map((x)=>{
      const output = []
      for(const i in x){
        if(x.hasOwnProperty(i)){
        output.push({...x[i],id:i})
        }
      }
    }))
    */
    .pipe(takeUntil(this.unsubscribe$))
      .subscribe((x)=>{
      console.log(x)
      //this.allDatae.push(x)
    })


  }

}
