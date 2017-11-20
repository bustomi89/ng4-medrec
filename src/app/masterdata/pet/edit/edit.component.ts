import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PetService } from 'app/masterdata/pet/pet.service';
import { PetModel } from 'app/masterdata/pet/pet.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  @Input() indexPetId: number;

  @Output() eventPet = new EventEmitter<PetModel>();
  
  statusProcess : string;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _petService: PetService
  ) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        if (this.indexPetId != undefined || this.indexPetId != null){
          this.getSinglePet(this.indexPetId);
        }
      }
    )
  }

  ngOnChanges(change: SimpleChanges): void { 
    if (this.indexPetId != undefined || this.indexPetId != null){
    this.getSinglePet(change.indexPetId.currentValue);
      this.statusProcess = '';
    }
  }

  //model:any={};
  model = new PetModel();
  
  

  getSinglePet(id){
    this._petService
      .getPetById(id)
      .subscribe(pet =>{
          this.model = pet;
          })
  };
  
  updatePet(){
    if(this.model.petId == null || this.model.petId== 0 ){
      if (Object.keys(this.model).length != 0){
        this._petService
        .createPet(this.model)
        .subscribe(()=> this.goBack());

        this.eventPet.emit(this.model);
        this.statusProcess = "Add Data is Success!";
      }

    } else{
      this._petService
      .updatePet(this.model)
      .subscribe(()=> this.goBack());

      this.eventPet.emit(this.model);
      this.statusProcess = "Save Data is Success!";
    }
  }
  
  goBack(){
    this._petService.getAllPet();
    this.router.navigate(['/masterdata/pet/home']);
  }

  tonggleAddReset(){
    this.model = new PetModel();
    this.statusProcess = '';
  }

}
