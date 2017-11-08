import { Component, OnInit } from '@angular/core';
import { CustomerModel } from 'app/masterdata/customer/customer.model';
import { CustomerService } from 'app/masterdata/customer/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(
      private _customerService: CustomerService,
       private router: Router) { }
  
    ngOnInit() {
    }
  
  model = new CustomerModel();
    addCustomer(){
        this._customerService
          .createCustomer(this.model)
          .subscribe(()=> this.goBack());
    }
     goBack(){
      this.router.navigate(['/masterdata/customer/home']);
    }

}
