import { Component, OnInit, Input, AfterViewInit, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RegistrationService } from 'app/transaction/registration/registration.service';
import { RegistrationModel } from 'app/transaction/registration/registration.model';
import { PetModel } from 'app/transaction/registration/pet.model';
import { PetService } from 'app/transaction/registration/pet.service';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit{
  
  @Input() indexRegistrationId: number;

  @Output() eventRegistrations = new EventEmitter<RegistrationModel>();

  statusProcess : string;

    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private _RegistrationService: RegistrationService,
      private _PetService: PetService
    ) { }
  
    ngOnInit() {
      this.route.params
      .subscribe(
        (params: Params) => {
          this.indexRegistrationId = +params['id']; // casting dari string ke number
          this.getSingleRegistration(this.route.snapshot.params['id']);
        }
      );
    }

    // ngOnChanges(change: SimpleChanges): void { 
    //   if (this.indexRegistrationId != undefined || this.indexRegistrationId != null){
    //   this.getSingleRegistration(change.indexRegistrationId.currentValue);
    //     this.statusProcess = '';
    //   }
    // }
  
    //model:any={};
    registration = new RegistrationModel();

    pet = new PetModel();
    
    
  
    getSingleRegistration(id){
      this._RegistrationService
        .getRegistrationById(id)
        .subscribe(registration =>{
            this.registration = registration;
              console.log('petId'+this.registration.petId);
              this.getSinglePet(this.registration.petId);
            });
    };

    getSinglePet(id){
      this._PetService
      .getPetById(id)
      .subscribe(pet=>{
        this.pet = pet;
      });
    };
    
    updateRegistration(){

        this._RegistrationService
        .updateRegistration(this.registration)
        .subscribe(()=> this.goBack());

        this.statusProcess = "Save Data is Success!";

    }
   
    goBack(){
      this._RegistrationService.getAllRegistrations();
      this.router.navigate(['/transaction/registration/home']);
    }

    tonggleAddReset(){
      this.registration = new RegistrationModel();
      this.statusProcess = '';
    }
}
