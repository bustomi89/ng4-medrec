import { Component, OnInit, Input } from '@angular/core';
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
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _petService: PetService
  ) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.indexPetId = +params['id']; // casting dari string ke number
        this.getSinglePet(this.indexPetId);
      }
    )
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
      this._petService
        .updatePet(this.model)
        .subscribe(()=> this.goBack());
        this._petService.getAllPet();
  }
  
    goBack(){
    this._petService.getAllPet();
    this.router.navigate(['/masterdata/pet/home']);
  }

}
