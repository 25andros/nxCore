import { Component, OnDestroy, OnInit } from '@angular/core';
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

  constructor(private fb: FormBuilder,   )  {  }

  panelOpenState = false;


  //Form Builder
  sliderSelection = this.fb.group({
    radius:180,
    rightWheel: 155,
    leftWheel: 105,
    spokeQt: 12,
    spokeMat: 1, //may change to string
    spokeDia: 2,
  } );

  radius(){ return this.sliderSelection.value.radius}
  rWheel(){ return this.sliderSelection.value.rightWheel}
  lWheel(){ return this.sliderSelection.value.leftWheel}


  // stream of D3 drawings

baseline$=this.sliderSelection.statusChanges
  .pipe(takeUntil(this.unsubscribe$))
  .subscribe((x)=>{
    d3.selectAll('circle#rxjsCirc').remove();
    this.createCirRight()
    this.createCirLeft()
    d3.selectAll('line').remove();
    this.linesMake()
  });


  //lifecycle hooks

  ngOnInit(): void {
    this.makeCanvas();
    this.createCirBaselines(); //backdrop circle
    this.linesMake();
    this.createCirRight();
    this.createCirLeft();
    //this.barsMake();
    this.endNote();
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


  makeShapes(){
    //rectangle
    this.svg
    .append('rect')
    .attr('width',75)
    .attr('height',50)
    .attr('fill','yellow')
    ;

    //straightline
    this.svg
    .append('line')
    .attr('x1',50)
    .attr('x2',200)
    .attr('y1',50)
    .attr('y2',200)
    .attr('stroke','black')
    .attr('stroke-width',3)
    ;

    //polygon
    this.svg
    .append("polygon")
    .attr("points", "75,75 100,10 125,75 100,125 ")
    .style("fill", "none")
    .style("stroke", "black")
    .style("strokeWidth", "10px");
  }


  barsMake(){
    const ray=[20,30,15];

    // Mulitple bars
    this.svg
    .selectAll('rect')
    .data(ray)
    .enter()
        .append('rect')
        .attr('y', function(d:any,i:any) {return i*100})
        .attr('width', function(d:any){return d*10})
        .attr("height",50)
        .style("fill", "none")
        .style("stroke", "black")
        ;
  }
spokes= this.sliderSelection.value.spokeQt||0;
rWheelDraw=180;
lWheelDraw=100;
alfa=this.centreX;
bet=this.centreY;
offset= 360/this.spokes;

gety(degree:number,length:number):number{
  //rads = degree*Math.PI/180;
  return  Math.sin(degree*Math.PI/180)*length;
}

getx(degree:number,length:number){
  return  Math.cos(degree*Math.PI/180)*length;
}


iterDataR= Array(this.spokes).fill({}).map((x,i)=>
  x={x1:this.alfa,y1:this.bet,
     x2:this.getx(360/this.spokes*i,this.rWheelDraw)+this.alfa,y2:this.gety(360/this.spokes*i,this.rWheelDraw)+this.bet}
);

  linesMake(){

/*
    const ray=[20,30,15];

    this.svg
    .selectAll('line')
    .data(ray)
    .enter()
    .append('line')
    .attr('y', function(d:any,i:any) {return i*100})
    .attr('width', function(d:any){return d*10})
    .attr("height",50)
    .style("fill", "none")
    .style("stroke", "black")
    ;
*/

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
    ;

  }





  endNote(){

    d3
    .select('p')
    .append('p')
    .text(`end`);
  }

}

