import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';
import { HospitalModel } from 'app/transaction/hospital/hospital.model';

@Injectable()
export class HospitalService {

  //URLs for CRUD operations
  allHospitalUrl = "http://localhost:8080/hospital/all-hospital";
  hospitalUrl = "http://localhost:8080/hospital/hospital";

  constructor(private http:Http) { }

  //Fetch all Hospital
  getAllHospital(): Observable<HospitalModel[]> {
    return this.http.get(this.allHospitalUrl)
       .map(this.extractData)
        .catch(this.handleError);
  }

  //Create Hospital
  createHospital(hospital: HospitalModel):Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: cpHeaders });
      
      return this.http.post(this.hospitalUrl, hospital, options)
            .map(success => success.status)
            .catch(this.handleError);
  }

  //FetchHospital by id
  getHospitalById(hospitalId: string): Observable<HospitalModel> {
  let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
  let cpParams = new URLSearchParams();
  cpParams.set('id', hospitalId);			
  let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
  return this.http.get(this.hospitalUrl, options)
      .map(this.extractData)
      .catch(this.handleError);
  }	

  //Update Hospital
  updateHospital(hospital: HospitalModel):Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: cpHeaders });
      return this.http.put(this.hospitalUrl, hospital, options)
            .map(success => success.status)
            .catch(this.handleError);
  }
  
  //Delete Hospital	
  deleteHospitalById(hospitalId: string): Observable<number> {
  let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
  let cpParams = new URLSearchParams();
  cpParams.set('id', hospitalId);			
  let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
  return this.http.delete(this.hospitalUrl, options)
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
