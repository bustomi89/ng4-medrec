import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PetService } from 'app/masterdata/pet/pet.service';
import { PetModel } from 'app/masterdata/pet/pet.model';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _petService: PetService
  ) { }

  ngOnInit() {
    this.getSinglePet();
  }
  
  pet:PetModel;

  getSinglePet(){
    var id = this.route.snapshot.params['id'];
    this._petService
      .getPetById(id)
      .subscribe(pet =>{
          this.pet = pet;
          })
  };

  goBack(){
    this.router.navigate(['/masterdata/pet/home']);
  }

}
