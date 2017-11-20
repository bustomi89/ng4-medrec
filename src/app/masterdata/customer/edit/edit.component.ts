import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
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

  @Output() eventCustomer = new EventEmitter<CustomerModel>();

  statusProcess : string;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _customerService: CustomerService
  ) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        // this.indexCustomerId = +params['id']; // casting dari string ke number
        // this.getSingleCustomer(this.indexCustomerId);
        if (this.indexCustomerId != undefined || this.indexCustomerId != null){
          this.getSingleCustomer(this.indexCustomerId);
        }
      }
    )
  }

  ngOnChanges(change: SimpleChanges): void { 
    if (this.indexCustomerId != undefined || this.indexCustomerId != null){
    this.getSingleCustomer(change.indexCustomerId.currentValue);
      this.statusProcess = '';
    }
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
    if(this.model.customerId == null || this.model.customerId== 0 ){
      if (Object.keys(this.model).length != 0){
        this._customerService
        .createCustomer(this.model)
        .subscribe(()=> this.goBack());

        this.eventCustomer.emit(this.model);
        this.statusProcess = "Add Data is Success!";
      }

    } else{
      this._customerService
      .updateCustomer(this.model)
      .subscribe(()=> this.goBack());

      this.eventCustomer.emit(this.model);
      this.statusProcess = "Save Data is Success!";
    }
  }
  
    goBack(){
    this._customerService.getAllCustomer();
    this.router.navigate(['/masterdata/customer/home']);
  }

  tonggleAddReset(){
    this.model = new CustomerModel();
    this.statusProcess = '';
  }
}
