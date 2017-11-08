import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx'; import { DoctorModel } from 'app/masterdata/doctor/doctor.model';

@Injectable()
export class DoctorService {
  //URLs for CRUD operations
  allDoctorUrl = "http://localhost:8080/doctor/all-doctor";
  doctorUrl = "http://localhost:8080/doctor/doctor";

  constructor(private http:Http) { }

  //Fetch all Doctor
  getAllDoctor(): Observable<DoctorModel[]> {
    return this.http.get(this.allDoctorUrl)
      .map(this.extractData)
        .catch(this.handleError);
  }

  //Create Doctor
  createDoctor(doctor: DoctorModel):Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: cpHeaders });
      
      return this.http.post(this.doctorUrl, doctor, options)
            .map(success => success.status)
            .catch(this.handleError);
  }

  //Fetch Doctor by id
  getDoctorById(doctor_id: string): Observable<DoctorModel> {
  let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
  let cpParams = new URLSearchParams();
  cpParams.set('id', doctor_id);			
  let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
  return this.http.get(this.doctorUrl, options)
      .map(this.extractData)
      .catch(this.handleError);
  }	

  //Update Doctor
  updateDoctor(doctor: DoctorModel):Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: cpHeaders });
      return this.http.put(this.doctorUrl, doctor, options)
            .map(success => success.status)
            .catch(this.handleError);
  }

  //Delete Doctor	
  deleteDoctorById(doctor_id: string): Observable<number> {
  let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
  let cpParams = new URLSearchParams();
  cpParams.set('id', doctor_id);			
  let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
  return this.http.delete(this.doctorUrl, options)
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
