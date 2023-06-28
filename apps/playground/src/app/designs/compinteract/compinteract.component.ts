import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'gibbsltd-compinteract',
  templateUrl: './compinteract.component.html',
  styleUrls: ['./compinteract.component.css']
})
export class CompinteractComponent implements OnInit {

  unsubscribe$ = new Subject<void>();

  constructor(private _fg:FormBuilder,){}

  groupInput = this._fg.group({

    userName: 'andros',
    quantity: 5,
    targetTension: 120,
    actualTension:115,

  })

  getUserName(){ return this.groupInput.value.userName }
  getQuantity(){ return this.groupInput.value.quantity||3 }
  getTarget(){ return this.groupInput.value.targetTension||20 }
  getActualTension() {return this.groupInput.value.actualTension||100}

  baseline$=this.groupInput.statusChanges
  .pipe(takeUntil(this.unsubscribe$))
  .subscribe((x)=>{
    this.initObjz()
    console.clear()
    this.showObj()
  })

  //Lifecycle Hooks

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


  max=180; //px length for D3

  objLeft :{count:number,dist:number, x:number; y:number}[]= []
  objRight:{count:number,dist:number, x:number; y:number}[]= []

  read2D3conv=(this.max*.95)/this.getTarget();

  initObjz(){
    this.objLeft=Array(this.getQuantity()).fill({})
    .map((x,i)=>x={count:i,dist:this.getActualTension()*this.read2D3conv,x:5,y:7});

    this.objRight=Array(this.getQuantity()).fill({})
    .map((x,i)=>x={count:i,dist:this.getActualTension()*this.read2D3conv,x:5,y:7});
   //console.log(this.objLeft);

  }

  showObj(){
   console.log(this.objLeft);
   console.log(this.objRight);
  }

  ngOnInit(){

    //this.init();
    this.initObjz();
  }

}

/*
  listLeft:string[]=[];
  listRight:string[]=[];

  init(){
   this.listLeft = Array(this.getQuantity()).fill({})
   .map((x,i)=>x=i.toString());

   this.listRight = Array(this.getQuantity()).fill({})
   .map((x,i)=>x=i.toString());

   console.log(this.listLeft);
  }

*/
