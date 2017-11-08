import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx'; import { ClinicModel } from 'app/masterdata/clinic/clinic.model';

@Injectable()
export class ClinicService {
  //URLs for CRUD operations
  allClinicUrl = "http://localhost:8080/branch/all-branchs";
  clinicUrl = "http://localhost:8080/branch/branch";

  constructor(private http:Http) { 
  }
  
	//Fetch all Clinics
    getAllClinics(): Observable<ClinicModel[]> {
        return this.http.get(this.allClinicUrl)
		   		.map(this.extractData)
		        .catch(this.handleError);
	}
	
	//Create Clinic
    createClinic(clinic: ClinicModel):Observable<number> {
	    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        
        return this.http.post(this.clinicUrl, clinic, options)
               .map(success => success.status)
               .catch(this.handleError);
    }
	//Fetch Clinic by id
    getClinicById(clinicId: string): Observable<ClinicModel> {
		let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
		let cpParams = new URLSearchParams();
		cpParams.set('id', clinicId);			
		let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
		return this.http.get(this.clinicUrl, options)
			   .map(this.extractData)
			   .catch(this.handleError);
    }	
	//Update Clinic
    updateClinic(clinic: ClinicModel):Observable<number> {
	    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.put(this.clinicUrl, clinic, options)
               .map(success => success.status)
               .catch(this.handleError);
    }
    //Delete Clinic	
    deleteClinicById(clinicId: string): Observable<number> {
		let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
		let cpParams = new URLSearchParams();
		cpParams.set('id', clinicId);			
		let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
		return this.http.delete(this.clinicUrl, options)
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
