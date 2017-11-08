import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CustomerService } from 'app/masterdata/customer/customer.service';
import { CustomerModel } from 'app/masterdata/customer/customer.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  @Input() indexCustomerId: number;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _customerService: CustomerService
  ) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.indexCustomerId = +params['id']; // casting dari string ke number
        this.getSingleCustomer(this.indexCustomerId);
      }
    )
  }

  //model:any={};
  model = new CustomerModel();
  
  

  getSingleCustomer(id){
    this._customerService
      .getCustomerById(id)
      .subscribe(customer =>{
          this.model = customer;
          })
  };
  
  updateCustomer(){
      this._customerService
        .updateCustomer(this.model)
        .subscribe(()=> this.goBack());
        this._customerService.getAllCustomer();
  }
  
    goBack(){
    this._customerService.getAllCustomer();
    this.router.navigate(['/masterdata/customer/home']);
  }

}
