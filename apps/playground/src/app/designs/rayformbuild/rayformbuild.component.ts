import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'gibbsltd-rayformbuild',
  templateUrl: './rayformbuild.component.html',
  styleUrls: ['./rayformbuild.component.css']
})
export class RayformbuildComponent implements OnInit{

  constructor(private _fb: FormBuilder) {
  }

  rimInfo: FormGroup = this._fb.group({
      //stndTsn: 120,
  });

  ngOnInit() {

      this.rimInfo = this._fb.group({
      title: 'TOP',
      qt: 5,
      stndTsn: 120,
      //selling_points: this._fb.array([this._fb.group({point:''})])
      //spokes: this._fb.array([this._fb.group({})])
      //spoke:this._fb.array([])
      skills: this._fb.array([
        //[...Array(5).fill(this._fb.control(null))],
        this._fb.group({i:this.rimInfo.value.stndTsn||this.getTsn()}),
      ])

    })
   this.setStndTsn()
  }


  setStndTsn(){
    this.rimInfo.patchValue({
      //skills:[i:5],
      stndTsn: 170,
      //qt:7,

    })
  }

  getTsn(){return this.rimInfo.value.stndTsn}
  getQt(){return this.rimInfo.value.qt}

  get talent(){ return this.rimInfo.get('skills') as FormArray }

  addSkill(){ return this.talent.push(
    this._fb.group({i:this.rimInfo.value.stndTsn})
    //this._fb.group({i:this.rimInfo.value.stndTsn})
  )}

  rmSkill(index:any) { this.talent.removeAt(index) }

  //accessor f'x
  get addtlSpokes(){
    return this.rimInfo.get('spokes') as FormArray

  }
  addSpoke(){
    return this.addtlSpokes.push(
      this._fb.control('')
      //this._fb.control(null)
        //this._fb.group({i:this.rimInfo.value.stndTsn})
    ) //where I would populate with default tension
  }

  rmSpoke(){
   //this.spokeMechanisism.removeAt()
  }

  toScreen(){
    console.log(this.rimInfo)
  }

}
