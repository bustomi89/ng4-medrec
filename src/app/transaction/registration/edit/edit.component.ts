import { Component, OnInit, Input, AfterViewInit, SimpleChanges, Output, EventEmitter } from '@angular/core';
import {FormControl} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RegistrationService } from 'app/transaction/registration/registration.service';
import { RegistrationModel } from 'app/transaction/registration/registration.model';
import { PetModel } from 'app/transaction/registration/pet.model';
import { PetService } from 'app/transaction/registration/pet.service';


import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { DoctorService } from 'app/masterdata/doctor/doctor.service';
import { DoctorModel } from 'app/masterdata/doctor/doctor.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, AfterViewInit{
  
  @Input() indexRegistrationId: number;

  @Output() eventRegistrations = new EventEmitter<RegistrationModel>();

  statusProcess : string;

    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private _RegistrationService: RegistrationService,
      private _PetService: PetService,
      private _DoctorService : DoctorService
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

    ngAfterViewInit(){
      this.getPets();
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
    doctor = new DoctorModel();

    pets = [];
    doctors = [];
    
    
  
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
                      result.doctorId;
                    }
                }
                
          } );
    }

    getDoctors(doctorId){
      this._DoctorService.getAllDoctor()
          .subscribe(dataDoctor=> {
            // cache our list
            this.doctors = [...dataDoctor];
            console.log("doctors "+JSON.stringify(this.doctors));

                for(let result of this.doctors){
                    console.log("doctorId"+doctorId);
                    console.log("this.result.doctorId"+result.doctorId);
                    console.log("result.doctorName"+result.doctorName);
                    
                    if (doctorId== result.doctorId){
                      this.customSelected = result.doctorName;
                    }
                }
                
          } );
    }
    
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

  typeaheadOnSelect(event){
    console.log("event "+JSON.stringify(event));
    this.p_petId = event.item.petId;

    this.registration.petId = this.p_petId;
    this.p_petName = event.item.petName;

  }
  customSelected: string;
  p_petId : number;
  p_petName : string;

  statesComplex: any[] = [
    { id: 1, name: 'Alabama', region: 'South' },
    { id: 2, name: 'Alaska', region: 'West' },
    { id: 3, name: 'Arizona', region: 'West' },
    { id: 4, name: 'Arkansas', region: 'South' },
    { id: 5, name: 'California', region: 'West' },
    { id: 6, name: 'Colorado', region: 'West' },
    { id: 7, name: 'Connecticut', region: 'Northeast' },
    { id: 8, name: 'Delaware', region: 'South' },
    { id: 9, name: 'Florida', region: 'South' },
    { id: 10, name: 'Georgia', region: 'South' },
    { id: 11, name: 'Hawaii', region: 'West' },
    { id: 12, name: 'Idaho', region: 'West' },
    { id: 13, name: 'Illinois', region: 'Midwest' },
    { id: 14, name: 'Indiana', region: 'Midwest' },
    { id: 15, name: 'Iowa', region: 'Midwest' },
    { id: 16, name: 'Kansas', region: 'Midwest' },
    { id: 17, name: 'Kentucky', region: 'South' },
    { id: 18, name: 'Louisiana', region: 'South' },
    { id: 19, name: 'Maine', region: 'Northeast' },
    { id: 21, name: 'Maryland', region: 'South' },
    { id: 22, name: 'Massachusetts', region: 'Northeast' },
    { id: 23, name: 'Michigan', region: 'Midwest' },
    { id: 24, name: 'Minnesota', region: 'Midwest' },
    { id: 25, name: 'Mississippi', region: 'South' },
    { id: 26, name: 'Missouri', region: 'Midwest' },
    { id: 27, name: 'Montana', region: 'West' },
    { id: 28, name: 'Nebraska', region: 'Midwest' },
    { id: 29, name: 'Nevada', region: 'West' },
    { id: 30, name: 'New Hampshire', region: 'Northeast' },
    { id: 31, name: 'New Jersey', region: 'Northeast' },
    { id: 32, name: 'New Mexico', region: 'West' },
    { id: 33, name: 'New York', region: 'Northeast' },
    { id: 34, name: 'North Dakota', region: 'Midwest' },
    { id: 35, name: 'North Carolina', region: 'South' },
    { id: 36, name: 'Ohio', region: 'Midwest' },
    { id: 37, name: 'Oklahoma', region: 'South' },
    { id: 38, name: 'Oregon', region: 'West' },
    { id: 39, name: 'Pennsylvania', region: 'Northeast' },
    { id: 40, name: 'Rhode Island', region: 'Northeast' },
    { id: 41, name: 'South Carolina', region: 'South' },
    { id: 42, name: 'South Dakota', region: 'Midwest' },
    { id: 43, name: 'Tennessee', region: 'South' },
    { id: 44, name: 'Texas', region: 'South' },
    { id: 45, name: 'Utah', region: 'West' },
    { id: 46, name: 'Vermont', region: 'Northeast' },
    { id: 47, name: 'Virginia', region: 'South' },
    { id: 48, name: 'Washington', region: 'South' },
    { id: 49, name: 'West Virginia', region: 'South' },
    { id: 50, name: 'Wisconsin', region: 'Midwest' },
    { id: 51, name: 'Wyoming', region: 'West' }
  ];
}
