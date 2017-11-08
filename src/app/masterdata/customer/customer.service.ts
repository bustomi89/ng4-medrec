import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx'; import { CustomerModel } from 'app/masterdata/customer/customer.model';

@Injectable()
export class CustomerService {
  //URLs for CRUD operations
  allCustomerUrl = "http://localhost:8080/customer/all-customers";
  customerUrl = "http://localhost:8080/customer/customer";

  constructor(private http:Http) { }

  //Fetch all Customer
  getAllCustomer(): Observable<CustomerModel[]> {
    return this.http.get(this.allCustomerUrl)
       .map(this.extractData)
        .catch(this.handleError);
  }

  //Create Customer
  createCustomer(customer: CustomerModel):Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: cpHeaders });
      
      return this.http.post(this.customerUrl, customer, options)
            .map(success => success.status)
            .catch(this.handleError);
  }

  //Fetch Customer by id
  getCustomerById(customer_id: string): Observable<CustomerModel> {
  let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
  let cpParams = new URLSearchParams();
  cpParams.set('id', customer_id);			
  let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
  return this.http.get(this.customerUrl, options)
      .map(this.extractData)
      .catch(this.handleError);
  }	

  //Update Customer
  updateCustomer(customer: CustomerModel):Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: cpHeaders });
      return this.http.put(this.customerUrl, customer, options)
            .map(success => success.status)
            .catch(this.handleError);
  }
  
  //Delete Customer	
  deleteCustomerById(customer_id: string): Observable<number> {
  let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
  let cpParams = new URLSearchParams();
  cpParams.set('id', customer_id);			
  let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
  return this.http.delete(this.customerUrl, options)
      .map(success => success.status)
      .catch(this.handleError);
  }		

  private extractData(res: Response) {
    let body = res.json();
      return body;
  }

  private handleError (error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.status);
  }

}
