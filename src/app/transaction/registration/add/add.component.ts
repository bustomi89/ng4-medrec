import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from 'app/transaction/registration/registration.service';
import { RegistrationModel } from 'app/transaction/registration/registration.model';
import { PetModel } from 'app/transaction/registration/pet.model';


import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { PetService } from 'app/transaction/registration/pet.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  
  pets = [];
  customSelected: string;
  p_petId : number;
  p_petName : string;
  
    constructor(
      private _RegistrationService: RegistrationService,
       private router: Router,
       private _PetService: PetService
      ) { }
  
    ngOnInit() {
    }
  
    ngAfterViewInit(){
      this.getPets();
    }

    getPets(){
      this._PetService.getAllPet()
          .subscribe(data=> {
            // cache our list
            this.pets = [...data];
            console.log("pets "+JSON.stringify(this.pets));
                for(let result of this.pets){
                    console.log("result.petId"+result.petId);
                    console.log("this.registration.petId"+this.registration.petId);
                    console.log("result.petName"+result.petName);
                    
                    if (this.registration.petId == result.petId){
                      this.customSelected = result.petName;
                    }
                }
                
          } );
    }

    typeaheadOnSelect(event){
      console.log("event "+JSON.stringify(event));
      this.p_petId = event.item.petId;
  
      this.registration.petId = this.p_petId;
      this.p_petName = event.item.petName;
  
    }

  

    registration = new RegistrationModel();

    pet = new PetModel();
    
  addRegistration(){
        this._RegistrationService
          .createRegistration(this.registration)
          .subscribe(()=> this.goBack());
    }
     goBack(){
      this.router.navigate(['/transaction/registration/home']);
    }
}
