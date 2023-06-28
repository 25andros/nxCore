import { Component } from '@angular/core';

@Component({
  selector: 'gibbsltd-designs',
  templateUrl: './designs.component.html',
  styleUrls: ['./designs.component.scss'],
})
export class DesignsComponent {

  startup():number{

    const jazz= Array(7).fill(
      Array(7).fill('').map((x,i)=>x=i)
    )

    const base= Array(7).fill('')
    .map((x,i)=>
         x= Array(7).fill('').map((x,i)=>x=i)
        )


    //console.log(jazz)
    //console.log(base)
    return 5;
  }


  constructor(){

    this.startup();


  }

}
