import { Component, ViewEncapsulation, OnInit, ViewChild, Input } from '@angular/core';
import { DatatableComponent } from "@swimlane/ngx-datatable/release";
import { RegistrationModel } from 'app/transaction/registration/registration.model';
import { EditComponent } from 'app/transaction/registration/edit/edit.component';
import { RegistrationService } from 'app/transaction/registration/registration.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  
      encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  indexRegistrationId : number;
  showForm : boolean;

  registrationEdit: RegistrationModel;

  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild(EditComponent) editregistration : EditComponent;
  
    rows = [];
    temp = [];
    loadingIndicator: boolean = true;
    timeout: any;
    reorderable: boolean = true;

    selected = [];

    statusFormEdit: boolean = false;

    pageSize: number = 10;
  
    controls: any = {
      pageSize:  10,
      filter: '',
    }
  
    columns = [
      { prop: 'examId' },
      { name: 'petId' },
      { name: 'historyNote' },
      { name: 'temperature' },
      { name: 'weight' },
      { name: 'pulseRate' },
      { name: 'heartRate' },
      { name: 'respRate' },
      { name: 'indexBody' },
      { name: 'note' },
      { name: 'customerType' },
    ];
  
   constructor(
      private _RegistrationService:RegistrationService
    ) {
  
    }
  
    ngOnInit() {
      this.getRegistrations();
    }

    getRegistrations(){
      this._RegistrationService.getAllRegistrations()
          .subscribe(data=> {

            // cache our list
            this.temp = [...data];
      
            // push our inital complete list
            this.rows = data;
            
            this.loadingIndicator = false;
          } )
    }

    getRefreshRegistrations($event){
        // script untuk nambah json ke datatables
        // this.rows.push($event);
        // this.rows = [...this.rows]
      if($event.examId == null || $event.examId == 0 ){
          
          this.rows.push($event);
          // this.rows = [...this.rows]; 

      }else{
            for(let i=0; i < this.temp.length; i++){
                if (this.temp[i].examId == $event.examId){
                  this.temp[i].petId = $event.petId;
                  this.temp[i].historyNote = $event.historyNote;
                  this.temp[i].temperature = $event.temperature;
                  this.temp[i].weight = $event.weight;
                  this.temp[i].pulseRate = $event.pulseRate;
                  this.temp[i].heartRate = $event.heartRate;
                  this.temp[i].respRate = $event.respRate;
                  this.temp[i].indexBody = $event.indexBody;
                  this.temp[i].note = $event.note;
                  this.temp[i].customerType = $event.customerType;
                }
            }

            for(let i=0; i < this.rows.length; i++){
                if (this.rows[i].examId == $event.examId){
                  
                  this.rows[i].petId = $event.petId;
                  this.rows[i].historyNote = $event.historyNote;
                  this.rows[i].temperature = $event.temperature;
                  this.rows[i].weight = $event.weight;
                  this.rows[i].pulseRate = $event.pulseRate;
                  this.rows[i].heartRate = $event.heartRate;
                  this.rows[i].respRate = $event.respRate;
                  this.rows[i].indexBody = $event.indexBody;
                  this.rows[i].note = $event.note;
                  this.rows[i].customerType = $event.customerType;
                }
            }
      }
        
    }
  
     updateFilter(event) {

      const val = event.target.value.toLowerCase();
   
      // filter our data
      const temp = this.temp.filter(function(d) {
        console.log("d "+JSON.stringify(d));

        return !val || ['examId','petId','historyNote','temperature','weight','pulseRate','heartRate','respRate','indexBody','note','customerType'].some((field: any)=>{
          
          return ((d[field] === null) ? '' : d[field]).toString().toLowerCase().indexOf(val) !== -1
        }) 
      });
  
      // update the rows
      this.rows = temp;
      // Whenever the filter changes, always go back to the first page
      this.table.offset = 0;
    }
  
  
     updatePageSize(value) {
             
        if(!this.controls.filter){
          // update the rows
          this.rows = [...this.temp];
          // Whenever the filter changes, always go back to the first page
          this.table.offset = 0;
        }
  
        this.controls.pageSize = parseInt(value)
  
        this.table.limit = this.controls.pageSize; 
        
        window.dispatchEvent(new Event('resize'));
  
    }

    toggleExpandRow(row) {
      // console.log('Toggled Expand Row!', row);
      this.table.rowDetail.toggleExpandRow(row);
    }

    onActivate(event){
      // console.log("onActivate "+event);
    }
    onSelect(event){
      // this.statusFormEdit = true;
      // this.indexRegistrationId = event.selected[0].registrationId;
    }

    onPage(event) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        // console.log('paged!', event);
      }, 100);
    }

    onDetailToggle(event) {
      // console.log('Detail Toggled', event);
    }

    toggleDelete(row) {
        this._RegistrationService
          .deleteRegistrationById(row.examId)
          .subscribe(() => {
            this.getRegistrations();
          } )
    }
    
}
