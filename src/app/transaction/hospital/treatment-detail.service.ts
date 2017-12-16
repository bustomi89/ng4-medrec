import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx'; 
import { TreatmentDetailModel } from 'app/transaction/hospital/treatment-detail.model';

@Injectable()
export class TreatmentDetailService {

   //URLs for CRUD operations
   allTreatmentDetailUrl = "http://localhost:8080/treatment/all-treatment-detail";
   treatmentDetailUrl = "http://localhost:8080/treatment/treatment-detail";
 
   constructor(private http:Http) { }
 
   //Fetch all TreatmentDetail
  //  getAllTreatmentDetail(): Observable<TreatmentDetailModel[]> {
  //    return this.http.get(this.allTreatmentDetailUrl)
  //       .map(this.extractData)
  //        .catch(this.handleError);
  //  }

   getTreatmentDetailbyTreatmentId() : Observable<TreatmentDetailModel[]> {
    return this.http.get(this.allTreatmentDetailUrl)
    .map(this.extractData)
     .catch(this.handleError);
   }
 
   //Create TreatmentDetail
   createTreatmentDetail(treatmentDetail: TreatmentDetailModel):Observable<number> {
     let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
       let options = new RequestOptions({ headers: cpHeaders });
       
       return this.http.post(this.treatmentDetailUrl, treatmentDetail, options)
             .map(success => success.status)
             .catch(this.handleError);
   }
 
   //Fetch TreatmentDetail by id
   getTreatmentDetailById(treatmentDetail_id: string): Observable<TreatmentDetailModel> {
   let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
   let cpParams = new URLSearchParams();
   cpParams.set('id', treatmentDetail_id);			
   let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
   return this.http.get(this.treatmentDetailUrl, options)
       .map(this.extractData)
       .catch(this.handleError);
   }	
 
   //Update TreatmentDetail
   updateTreatmentDetail(treatmentDetail: TreatmentDetailModel):Observable<number> {
     let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
       let options = new RequestOptions({ headers: cpHeaders });
       return this.http.put(this.treatmentDetailUrl, treatmentDetail, options)
             .map(success => success.status)
             .catch(this.handleError);
   }
   
   //Delete TreatmentDetail	
   deleteTreatmentDetailById(treatmentDetail_id: string): Observable<number> {
   let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
   let cpParams = new URLSearchParams();
   cpParams.set('id', treatmentDetail_id);			
   let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
   return this.http.delete(this.treatmentDetailUrl, options)
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
