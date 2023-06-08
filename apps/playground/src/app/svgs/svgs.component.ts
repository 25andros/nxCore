import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Chartdata } from '../interfaces/chartdata';

@Component({
  selector: 'gibbsltd-svgs',
  templateUrl: './svgs.component.html',
  styleUrls: ['./svgs.component.scss'],
})
export class SvgsComponent {
  //helpful link https://blog.logrocket.com/data-visualization-angular-d3-js/#load-multiplep-components-page


  constructor(private _fb: FormBuilder){}


  //Form Builder
  selectGraph = this._fb.group({
    bar:false,
    pie:false,
    scatter:false,
    bar2:false,

    graph: [`bar`],
  } );


  // getters

  selectedBar(){return this.selectGraph.value.bar;}
  selectedPie(){return this.selectGraph.value.pie;}
  selectedScat(){return this.selectGraph.value.scatter;}
  selectedBar2(){return this.selectGraph.value.bar2;}



  name(){return this.selectGraph.value.graph;}


  //data for bar2 chart

 chartData_2D_1: Chartdata = {
    yrange: 200000,
    lineData: [
      { label: 'Vue', value: 166443 },
      { label: 'React', value: 150793 },
      { label: 'Angular', value: 62342 },
      { label: 'Backbone', value: 27647 },
      { label: 'Ember', value: 21471 },
    ],
  };



}
