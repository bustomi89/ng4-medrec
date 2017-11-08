import { Component, ViewEncapsulation, OnInit, ViewChild, Input } from '@angular/core';
import { ClinicService } from 'app/masterdata/clinic/clinic.service';
import { DatatableComponent } from "@swimlane/ngx-datatable/release";
import { ClinicModel } from 'app/masterdata/clinic/clinic.model';
import { EditComponent } from 'app/masterdata/clinic/edit/edit.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  
      encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  indexClinicId : number;
  showForm : boolean;

  clinicEdit: ClinicModel;

  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild(EditComponent) editClinic : EditComponent;
  
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
      { prop: 'branchId' },
      { name: 'branchCode' },
      { name: 'branchName' },
      { name: 'description' },
      { name: 'activeStatus' },
      { name: 'branchLevel' },
      { name: 'postalCode' },
    ];
  
   constructor(
      private _clinicService:ClinicService
    ) {
  
    }
  
    ngOnInit() {
      this.getClinices();
    }

    getClinices(){
      this._clinicService.getAllClinics()
          .subscribe(data=> {

            // cache our list
            this.temp = [...data];
      
            // push our inital complete list
            this.rows = data;
            
            this.loadingIndicator = false;
          } )
    }

    getRefreshClinices($event){
        // script untuk nambah json ke datatables
        // this.rows.push($event);
        // this.rows = [...this.rows]
      if($event.branchId == null || $event.branchId == 0 ){
          
          this.rows.push($event);
          // this.rows = [...this.rows]; 

      }else{
            for(let i=0; i < this.temp.length; i++){
                if (this.temp[i].branchId == $event.branchId){
                      this.temp[i].branchCode = $event.branchCode;
                      this.temp[i].branchName = $event.branchName;
                      this.temp[i].description = $event.description;
                      this.temp[i].activeStatus = $event.activeStatus;
                      this.temp[i].branchLevel = $event.branchLevel;
                      this.temp[i].postalCode = $event.postalCode;
                }
            }

            for(let i=0; i < this.rows.length; i++){
              if (this.rows[i].branchId == $event.branchId){
                  this.rows[i].branchCode = $event.branchCode;
                  this.rows[i].branchName = $event.branchName;
                  this.rows[i].description = $event.description;
                  this.rows[i].activeStatus = $event.activeStatus;
                  this.rows[i].branchLevel = $event.branchLevel;
                  this.rows[i].postalCode = $event.postalCode;
                }
            }
      }
        
    }
  
     updateFilter(event) {

      const val = event.target.value.toLowerCase();
  
      // filter our data
      const temp = this.temp.filter(function(d) {
        console.log("d "+JSON.stringify(d));

        return !val || ['branchId', 'branchCode', 'branchName','description','activeStatus','branchLevel','postalCode'].some((field: any)=>{
          
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
      this.statusFormEdit = true;
      this.indexClinicId = event.selected[0].branchId;
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
        this._clinicService
          .deleteClinicById(row.branchId)
          .subscribe(() => {
            this.getClinices();
          } )
    }

    tonggleAdd(){
      if (this.statusFormEdit == false){
        this.statusFormEdit = true;
      } else {
        this.statusFormEdit = true;
        this.editClinic.tonggleAddReset();
      }
      
    }
    
}
