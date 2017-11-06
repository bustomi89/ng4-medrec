import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx'; import { CategoryModel } from 'app/masterdata/category/category.model';
;

@Injectable()
export class CategoriService {
  //URLs for CRUD operations
  allCategoryUrl = "http://localhost:8080/category/all-categorys";
  categoryUrl = "http://localhost:8080/category/category";

  // constructor(private _http:Http) { }
  
  // checkMe:any;
  
  // getCategories(): Observable<CategoriModel>{
  //   return this._http.get("http://35.188.20.96/medical-record/category-select.php/")
  //     .map(res=>{
  //       this.checkMe = res;
  //       // if(this.checkMe._body !== "0"){
  //       return res.json();
  //       // }
  //     });
  // }

  // addCategory(info){
  //   return this._http.post("http://35.188.20.96/medical-record/category-insert.php",info)
  //     .map(()=>"");
  // }
  
  // getCategory(id){
  //   return this._http.post("http://35.188.20.96/medical-record/category-selectone.php/",{'id':id})
  //     .map(res=>res.json());
  // }

  // deleteCategory(id){
  //   return this._http.post("http://35.188.20.96/medical-record/category-delete.php/",{'id':id})
  //     .map(()=>this.getCategories());
  // }

  // updateCategory(info){
  //   return this._http.post("http://35.188.20.96/medical-record/category-update.php/", info)
  //     .map(()=>"");
  // }

  constructor(private http:Http) { 
  }
  
	//Fetch all Categorys
    getAllCategorys(): Observable<CategoryModel[]> {
        return this.http.get(this.allCategoryUrl)
		   		.map(this.extractData)
		        .catch(this.handleError);
	}
	
	//Create Category
    createCategory(category: CategoryModel):Observable<number> {
	    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        
        return this.http.post(this.categoryUrl, category, options)
               .map(success => success.status)
               .catch(this.handleError);
    }
	//Fetch Category by id
    getCategoryById(categoryId: string): Observable<CategoryModel> {
		let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
		let cpParams = new URLSearchParams();
		cpParams.set('id', categoryId);			
		let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
		return this.http.get(this.categoryUrl, options)
			   .map(this.extractData)
			   .catch(this.handleError);
    }	
	//Update Category
    updateCategory(category: CategoryModel):Observable<number> {
	    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.put(this.categoryUrl, category, options)
               .map(success => success.status)
               .catch(this.handleError);
    }
    //Delete Category	
    deleteCategoryById(categoryId: string): Observable<number> {
		let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
		let cpParams = new URLSearchParams();
		cpParams.set('id', categoryId);			
		let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
		return this.http.delete(this.categoryUrl, options)
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
