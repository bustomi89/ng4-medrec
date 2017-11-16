import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx'; import { RegistrationModel } from 'app/transaction/registration/registration.model';
;

@Injectable()
export class RegistrationService {
  //URLs for CRUD operations
  allRegistrationUrl = "http://localhost:8080/transaction/all-examinations";
  registrationUrl = "http://localhost:8080/transaction/examination";

  constructor(private http:Http) { 
  }
  
	//Fetch all Registrations
    getAllRegistrations(): Observable<RegistrationModel[]> {
        return this.http.get(this.allRegistrationUrl)
		   		.map(this.extractData)
		        .catch(this.handleError);
	}
	
	//Create registration
    createRegistration(registration: RegistrationModel):Observable<number> {
	    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        
        return this.http.post(this.registrationUrl, registration, options)
               .map(success => success.status)
               .catch(this.handleError);
    }
	//Fetch registration by id
    getRegistrationById(examId: string): Observable<RegistrationModel> {
		let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
		let cpParams = new URLSearchParams();
		cpParams.set('id', examId);			
		let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
		return this.http.get(this.registrationUrl, options)
			   .map(this.extractData)
			   .catch(this.handleError);
    }	
	//Update registration
    updateRegistration(registration: RegistrationModel):Observable<number> {
	    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.put(this.registrationUrl, registration, options)
               .map(success => success.status)
               .catch(this.handleError);
    }
    //Delete registration	
    deleteRegistrationById(examId: string): Observable<number> {
		let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
		let cpParams = new URLSearchParams();
		cpParams.set('id', examId);			
		let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
		return this.http.delete(this.registrationUrl, options)
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
