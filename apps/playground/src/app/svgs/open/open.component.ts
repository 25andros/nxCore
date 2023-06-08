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

  constructor(private fb: FormBuilder,
             )
  {
  }

  //Form Builder
  sliderSelection = this.fb.group({
    radius:180,
    rightWheel: 155,
    leftWheel: 105,
  } );


  radius(){ return this.sliderSelection.value.radius}
  rWheel(){ return this.sliderSelection.value.rightWheel}
  lWheel(){ return this.sliderSelection.value.leftWheel}

baseline$=this.sliderSelection.statusChanges
  .pipe(takeUntil(this.unsubscribe$))
  .subscribe((x)=>{
    d3.selectAll('circle').remove()
    this.createCirBaseline();
    this.createCirRight()
    this.createCirLeft()
  });


  //lifecycle hooks

  ngOnInit(): void {
    this.makeCanvas();
    this.createCirBaseline();
    this.createCirRight();
    this.createCirLeft();
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

  createCirBaseline():void{
    this.svg
    .append('circle')
    .attr('cx', this.centreX)
    .attr('cy', this.centreY)
    .attr('r',this.radius())
    .attr('fill','none')
    .attr('id','baseline')
    .style("stroke", "black")
    .attr('stroke-width',7)
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



  endNote(){

    d3
    .select('p')
    .append('p')
    .text(`end`);
  }

}

