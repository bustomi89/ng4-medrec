import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from 'app/masterdata/customer/customer.service';
import { CustomerModel } from 'app/masterdata/customer/customer.model';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _customerService: CustomerService
  ) { }

  ngOnInit() {
    this.getSingleCustomer();
  }
  
  customer:CustomerModel;

  getSingleCustomer(){
    var id = this.route.snapshot.params['id'];
    this._customerService
      .getCustomerById(id)
      .subscribe(customer =>{
          this.customer = customer;
          })
  };

  goBack(){
    this.router.navigate(['/masterdata/customer/home']);
  }

}
