import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx'; import { PetModel } from 'app/masterdata/pet/pet.model';

@Injectable()
export class PetService {

   //URLs for CRUD operations
   allPetUrl = "http://localhost:8080/pet/all-pets";
   petUrl = "http://localhost:8080/pet/pet";
 
   constructor(private http:Http) { }
 
   //Fetch all Pet
   getAllPet(): Observable<PetModel[]> {
     return this.http.get(this.allPetUrl)
        .map(this.extractData)
         .catch(this.handleError);
   }
 
   //Create Pet
   createPet(pet: PetModel):Observable<number> {
     let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
       let options = new RequestOptions({ headers: cpHeaders });
       
       return this.http.post(this.petUrl, pet, options)
             .map(success => success.status)
             .catch(this.handleError);
   }
 
   //Fetch Pet by id
   getPetById(pet_id: string): Observable<PetModel> {
   let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
   let cpParams = new URLSearchParams();
   cpParams.set('id', pet_id);			
   let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
   return this.http.get(this.petUrl, options)
       .map(this.extractData)
       .catch(this.handleError);
   }	
 
   //Update Pet
   updatePet(pet: PetModel):Observable<number> {
     let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
       let options = new RequestOptions({ headers: cpHeaders });
       return this.http.put(this.petUrl, pet, options)
             .map(success => success.status)
             .catch(this.handleError);
   }
   
   //Delete Pet	
   deletePetById(pet_id: string): Observable<number> {
   let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
   let cpParams = new URLSearchParams();
   cpParams.set('id', pet_id);			
   let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
   return this.http.delete(this.petUrl, options)
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
