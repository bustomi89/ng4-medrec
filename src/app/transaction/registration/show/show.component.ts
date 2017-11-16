import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RegistrationService } from 'app/transaction/registration/registration.service';
import { RegistrationModel } from 'app/transaction/registration/registration.model';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  
    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private _RegistrationService: RegistrationService
    ) { }
  
    ngOnInit() {
      this.getSingleRegistration();
    }
    
    registration:RegistrationModel;
  
    getSingleRegistration(){
      var id = this.route.snapshot.params['id'];
      this._RegistrationService
        .getRegistrationById(id)
        .subscribe(registration =>{
            this.registration = registration;
            })
    };
  
    goBack(){
      this.router.navigate(['/masterdata/category/home']);
    }

}
