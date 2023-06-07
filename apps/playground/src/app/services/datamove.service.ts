import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatamoveService {

  //constructor() { }


 dataPipe =  new Subject<any>();

  dataSend(data:any){
    this.dataPipe.next(data);
  }

}
