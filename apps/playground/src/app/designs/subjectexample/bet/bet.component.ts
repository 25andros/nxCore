import { Component } from '@angular/core';
import { DatamoveService } from '../../../services/datamove.service';

@Component({
  selector: 'gibbsltd-bet',
  templateUrl: './bet.component.html',
  styleUrls: ['./bet.component.css']
})
export class BetComponent {


constructor(private dataMove:DatamoveService){}

  anyValue:any = `charlie`;



  ngOnInit(){

    this.dataMove.dataPipe.subscribe((x)=>{
      this.anyValue= x;
    });


  }

}
