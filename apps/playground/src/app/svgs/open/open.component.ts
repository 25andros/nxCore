import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
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

  constructor(private _fb: FormBuilder,   )  {  }

  testTab=2;

  //Form Builder
  sliderSelection = this._fb.group({
    radius:180,
    rightWheel: 155,
    leftWheel: 105||0,
    spokeQt: 16,

    spokeMat: 1, //may change to string
    spokeDia: 2,
    reading:25,
    immed: 25,

    polyL: 155,
    polyR: 175,
  } );

  radius(){ return this.sliderSelection.value.radius}
  rWheel(){ return this.sliderSelection.value.rightWheel}
  lWheel(){ return this.sliderSelection.value.leftWheel}
  spokeCount(){ return this.sliderSelection.value.spokeQt||3}
  polyL(){ return this.sliderSelection.value.polyL||100}
  polyR(){ return this.sliderSelection.value.polyR||100}

  spokeDia(){ return this.sliderSelection.value.spokeDia||0}
  immed(){ return this.sliderSelection.value.immed||0}
  rtReading(){return this.sliderSelection.value.reading||0}



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

    d3.selectAll('polygon').remove();
    this.makepolyGon();
  });


  //lifecycle hooks

  ngOnInit(): void {
    this.buildForm()
    this.makeCanvas();
    this.createCirBaselines(); //backdrop circle
    this.linesMake();
    this.createCirRight();
    this.createCirLeft();
    this.initRay();
    this.linesMake();
    this.makepolyGon();
   this.genUserWheel(this.rtWheelL(),'pink')
   this.genUserWheel(this.rtWheelR(),'purple')
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

  //initialises iterDataR with the x,y co-ords for the spokes
  initRay(){
    this.iterDataR= Array(this.spokeCount()).fill({}).map((x,i)=>
x={
  x1:this.alfa,
  y1:this.bet,
  x2:this.getx(360/this.spokeCount()*i,this.slideMax)+this.alfa,
  y2:this.gety(360/this.spokeCount()*i,this.slideMax)+this.bet}
 );
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

  polyLeft:{ x:number; y:number}[]= [
  ];

  polyRight:{ x:number; y:number}[]= [
  ];

  obj2polyPass(alpha:{ x:number; y:number}[]){

    const xCor=alpha.map(x=>x.x);
    const  yCor=alpha.map(x=>x.y);
    return Array(alpha.length).fill({}).map((x,i)=>x=xCor[i]+","+yCor[i]).join(" ");
  }

  makepolyGon(){

      //console.log(this.polyLeft);

      //initialise of points for left polygon
    this.polyLeft=Array(this.spokeCount()).fill({}).map((x,i)=>
        x={
          x:this.getx(360/this.spokeCount()*i,this.polyL())+this.centreX,
          y:this.gety(360/this.spokeCount()*i,this.polyL())+this.centreY
        }
        //this.getx(degree, length)
);

      //initialise of points for right polygon
    this.polyRight=Array(this.spokeCount()).fill({}).map((x,i)=>
        x={
          x:this.getx(360/this.spokeCount()*i,this.polyR())+this.centreX,
          y:this.gety(360/this.spokeCount()*i,this.polyR())+this.centreY
        }
);

    this.svg
    .append("polygon")
    //.attr("points", "75,75 100,10 125,75 100,125")
    .attr("points", this.obj2polyPass(this.polyLeft))
    .style("fill", "none")
    .style("stroke", "orange")
    .style("stroke-width", 4)
    ;

    this.svg
    .append("polygon")
    .attr("points", this.obj2polyPass(this.polyRight))
    .style("fill", "none")
    .style("stroke", "blue")
    .style("stroke-width", 4)
    ;

  }

 // Measurement portion of application

      dynamic = this._fb.group({
        numOfSpokes:this._fb.array([ ]),
        spokesRight:this._fb.array([ ])
      })

      //factory fx's
      rtWheelL(){ return this.dynamic.value.numOfSpokes||0}
      rtWheelR(){ return this.dynamic.value.spokesRight}

    get spokeQt(){ return this.dynamic.get('numOfSpokes') as FormArray }
    get rSpokeQt(){ return this.dynamic.get('spokesRight') as FormArray }

    buildForm(){
      for(let i=0;i<this.spokeCount();i++){
        this.iterateFormSpoke()
      }
    }

    iterateFormSpoke(){
      this.spokeQt.push(this._fb.group({i:this.lWheel(),read:this.tsn2Read()}))
      this.rSpokeQt.push(this._fb.group({i:this.rWheel()}))
    }

    clearForm(){
      this.spokeQt.clear()
      this.rSpokeQt.clear()
    }

    // unsued

    addSpoke(){ this.spokeQt.push(
      this._fb.group({i:this.lWheel,j:this.tsn2Read()})
    )}

    rmSpoke(index:any){
      this.spokeQt.removeAt(index)
}

  userL:{ x:number; y:number}[]= [
  ];

  userR:{ x:number; y:number}[]= [
  ];

// ------

  genUserWheel(side:any,color:string){
    const ray=Array(this.spokeCount()).fill({})
    .map((x,i)=>side[i].i)
    .map((x,i)=>
         {
           const degr =  this.degToRad(360/this.spokeCount()*i)
           return {x:Math.cos(degr)*x+this.centreX,y:Math.sin(degr)*x+this.centreY}
         })
         //console.log(ray)
         const pts =this.obj2polyPass(ray)

    this.svg
    .append("polygon")
    //.attr("points", "75,75 100,10 125,75 100,125")
    .attr("points", pts)
    .style("fill", "none")
    .style("stroke", color)
    .style("stroke-width", 4)
    .attr('id',color)
    //.attr('id','genWheels#'+color)
    ;
    console.log
  }

  degToRad(degrees:number) {
    return degrees * (Math.PI / 180);
}

  delWheel(color:string){
    d3.select(`polygon#${color}`).remove()
    //d3.selectAll('polygon#genWheels').remove()
  }

toscn(){
  // // @ts-ignore
    //console.log(this.dynamic.value.numOfSpokes[0].i)

    const ray =Array(this.spokeCount()).fill({})
   // @ts-ignore
                  .map((x,i)=>this.dynamic.value.numOfSpokes[i].i)

                  .map((x,i)=>
                           {
                           const degr =  360/this.spokeCount()*i
                           return {x:Math.cos(degr)*x,y:Math.sin(degr)*x}
                  })
                  console.log(ray)
                const bro=this.obj2polyPass(ray)

                console.log(bro)
}

 modelledTenEquation(){
   //const val= this.spokeDia()*this.immed()

   const x= this.spokeDia()
   const z= this.immed()

   // the followed is a modelled equation of spoke diameter to tenison
   const a = (.000934*Math.pow(x,4)+-.00775*Math.pow(x,3)+.02379*Math.pow(x,2)+-.03174*Math.pow(x,1)+.0148)
   const b = (-.2345*Math.pow(x,4)+1.928*Math.pow(x,3)+-5.8596*Math.pow(x,2)+7.728*Math.pow(x,1)+-3.484)
   const c = (11.118*Math.pow(x,4)+-91.6978*Math.pow(x,3)+279.86*Math.pow(x,2)+-356.004*Math.pow(x,1)+156.045)

   /*
   console.log(a)
   console.log(b)
   console.log(c)
   */

   let y = a*Math.pow(z,2)+b*Math.pow(z,1)+c
    y=Number(y.toPrecision(4))
   //console.log(y)
   return y


 }

 tsn2Read(){
   //const val= this.spokeDia()*this.immed()

   const x= this.spokeDia()
   const z= this.lWheel()

   // the followed is a modelled equation of spoke diameter to tenison
   const a = (.000934*Math.pow(x,4)+-.00775*Math.pow(x,3)+.02379*Math.pow(x,2)+-.03174*Math.pow(x,1)+.0148)
   const b = (-.2345*Math.pow(x,4)+1.928*Math.pow(x,3)+-5.8596*Math.pow(x,2)+7.728*Math.pow(x,1)+-3.484)
   const c = (11.118*Math.pow(x,4)+-91.6978*Math.pow(x,3)+279.86*Math.pow(x,2)+-356.004*Math.pow(x,1)+156.045)

   let y = a*Math.pow(z||0,2)+b*Math.pow(z||0,1)+c
    y=Number(y.toPrecision(4))
   return y


 }

 showVal(side:any,i:number){
   return side[i].i

 }

secRead2Tsn(reading:number):number{
   const z= reading
   const x= this.spokeDia()

   // the followed is a modelled equation of spoke diameter to tenison
   const a = (.1469*Math.pow(x,2)+-.30095*Math.pow(x,1)+.74277)
   const b = (-13.84062*Math.pow(x,2)+21.9736*Math.pow(x,1)+-10.8199)
   const c = (369.5*Math.pow(x,2)+-1015.7422*Math.pow(x,1)+777.87767)

   let y = a*Math.pow(z,2)+b*Math.pow(z,1)+c
    y=Number(y.toPrecision(4))
   return y

}

secRead2TsnFull(reading:number):number{
   const z= reading
   const x= this.spokeDia()

   const a = (.8231*Math.pow(x,4)+-6.61049*Math.pow(x,3)+19.74329*Math.pow(x,2)+-25.6969*Math.pow(x,1)+12.879)
   const b = (-52.4527*Math.pow(x,4)+415.366*Math.pow(x,3)+-1227.4839*Math.pow(x,2)+1572.1551*Math.pow(x,1)+-741.1742)
   const c = (671.58908*Math.pow(x,4)+-5183.7605*Math.pow(x,3)+15106.849*Math.pow(x,2)+-19308.309*Math.pow(x,1)+9146.7)


      let y = a*Math.pow(z,2)+b*Math.pow(z,1)+c
    y=Number(y.toPrecision(4))
    console.log(y)
   return y

}
}

