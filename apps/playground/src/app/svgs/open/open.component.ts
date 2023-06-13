import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import * as d3 from 'd3';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'gibbsltd-open',
  templateUrl: './open.component.html',
  styleUrls: ['./open.component.css']
})
export class OpenComponent implements OnInit, OnDestroy{

  unsubscribe$ = new Subject<void>();
  panelOpenState = false;

  constructor(private fb: FormBuilder,   )  {  }


  //Form Builder
  sliderSelection = this.fb.group({
    radius:180,
    rightWheel: 155,
    leftWheel: 105,
    spokeQt: 10,
    spokeMat: 1, //may change to string
    spokeDia: 2,

  } );

  radius(){ return this.sliderSelection.value.radius}
  rWheel(){ return this.sliderSelection.value.rightWheel}
  lWheel(){ return this.sliderSelection.value.leftWheel}
  spokeCount(){ return this.sliderSelection.value.spokeQt||3}



  // stream of D3 drawings

baseline$=this.sliderSelection.statusChanges
  .pipe(takeUntil(this.unsubscribe$))
  .subscribe((x)=>{
    d3.selectAll('circle#rxjsCirc').remove();
    this.createCirRight()
    this.createCirLeft()

    //to allow for redraw of the max circle... will need to edit the .attr(r,radius())
    d3.selectAll('circle#maxCirc').remove();
    this.createCirBaselines();

    d3.selectAll('spokeLines').remove();
    this.initRay();
    this.linesMake();

  });


  //lifecycle hooks

  ngOnInit(): void {
    this.makeCanvas();
    this.createCirBaselines(); //backdrop circle
    this.linesMake();
    this.createCirRight();
    this.createCirLeft();
    this.initRay();
    this.linesMake();

    //this.polygonRight()
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


  slideMin=25;
  slideMax=180;
  step=1;

  widthPrint=375;
  heightPrint=375;
  centreX=this.widthPrint/2;
  centreY=this.heightPrint/2;
  circleRadius=50;

  rWheelDraw=180;
  lWheelDraw=100;
  alfa=this.centreX;
  bet=this.centreY;
  offset= 360/this.spokeCount();


  svg:any;
  svgCirc:any;

  makeCanvas(){
    this.svg= d3
    .select('figure#pad')
    .append('svg')
    .attr('width',this.widthPrint)
    .attr('height',this.heightPrint)
    ;
  }

  //creates Min && Max for the polygon ranges
  createCirBaselines():void{
    this.svg
    .append('circle')
    .attr('cx', this.centreX)
    .attr('cy', this.centreY)
    .attr('r',this.slideMax)
    .attr('fill','none')
    .attr('id','maxCirc')
    .style("stroke", "black")
    .attr('stroke-width',1)
    ;

    this.svg
    .append('circle')
    .attr('cx', this.centreX)
    .attr('cy', this.centreY)
    .attr('r',this.slideMin)
    .attr('fill','none')
    .attr('id','minCirc')
    .style("stroke", "black")
    .attr('stroke-width',1)
    ;

  }

  createCirRight():void{
    this.svg
    .append('circle')
    .attr('cx', this.centreX)
    .attr('cy', this.centreY)
    .attr('r',this.rWheel())
    .style("stroke", "blue")
    .attr('fill','none')
    .attr('stroke-width',3)
    .attr('id','rxjsCirc')
    ;
  }

  createCirLeft():void{
    this.svg
    .append('circle')
    .attr('cx', this.centreX)
    .attr('cy', this.centreY)
    .attr('r',this.lWheel())
    .style("stroke", "orange")
    .attr('stroke-width',3)
    .attr('fill','none')
    .attr('id','rxjsCirc')
    ;
  }

  iterDataR=Array({});

  gety(degree:number,length:number):number{
    //rads = degree*Math.PI/180;
    return  Math.sin(degree*Math.PI/180)*length;
  }

  getx(degree:number,length:number){
    return  Math.cos(degree*Math.PI/180)*length;
  }

  initRay(){
    //this.iterDataR=Array(this.spokeCount()).fill({})

    this.iterDataR= Array(this.spokeCount()).fill({}).map((x,i)=>
x={
  x1:this.alfa,
  y1:this.bet,
  x2:this.getx(360/this.spokeCount()*i,this.rWheelDraw)+this.alfa,
  y2:this.gety(360/this.spokeCount()*i,this.rWheelDraw)+this.bet}
 );
 //console.log("initRay");
 //console.log(this.iterDataR);
}


  linesMake(){

    this.svg
    .selectAll('line')
    .data(this.iterDataR)
    .join('line')
    .attr('x1',function(d:any) {return d.x1})
    .attr('x2',function(d:any) {return d.x2})
    .attr('y1',function(d:any) {return d.y1})
    .attr('y2',function(d:any) {return d.y2})
    .attr('stroke','black')
    .attr('stroke-width',1)
    .attr('spokeLines')
    ;

  }

  polygonRight(){

    //Right wheel
    this.svg
    .append("polygon")
    .attr("points", "75,75 100,10 125,75 100,125")
    .style("fill", "none")
    .style("stroke", "black")
    .style("strokeWidth", 10)
    ;
  }




}

