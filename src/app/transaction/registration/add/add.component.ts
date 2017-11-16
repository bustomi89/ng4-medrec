import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from 'app/transaction/registration/registration.service';
import { RegistrationModel } from 'app/transaction/registration/registration.model';
import { PetModel } from 'app/transaction/registration/pet.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  
    constructor(
      private _RegistrationService: RegistrationService,
       private router: Router) { }
  
    ngOnInit() {
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
