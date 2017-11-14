import { Component, OnInit } from '@angular/core';
import { PetModel } from 'app/masterdata/pet/pet.model';
import { PetService } from 'app/masterdata/pet/pet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(
    private _petService: PetService,
     private router: Router) { }

  ngOnInit() {
  }

  model = new PetModel();
  addPet(){
      this._petService
        .createPet(this.model)
        .subscribe(()=> this.goBack());
  }
    goBack(){
    this.router.navigate(['/masterdata/pet/home']);
  }

}
