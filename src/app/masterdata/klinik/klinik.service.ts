import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class ClinicService {
  
  clinics=[];

  constructor(private _http:Http) { }

  checkMe:any;

  getClinics(){
    return this._http.get("http://35.188.20.96/medical-record/clinic-select.php/")
      .map(res=>{
        this.checkMe = res;
        if(this.checkMe._body !== "0"){
           return res.json()
        }
      });
  }

  addClinic(info){
    return this._http.post("http://35.188.20.96/medical-record/clinic-insert.php",info)
      .map(()=>"");
  }
  
  getClinic(id){
    return this._http.post("http://35.188.20.96/medical-record/clinic-selectone.php/",{'id':id})
      .map(res=>res.json());
  }

  deleteClinic(id){
    return this._http.post("http://35.188.20.96/medical-record/clinic-delete.php/",{'id':id})
      .map(()=>this.getClinics());
  }

  updateClinic(info){
    return this._http.post("http://35.188.20.96/medical-record/clinic-update.php/", info)
      .map(()=>"");
  }

}
