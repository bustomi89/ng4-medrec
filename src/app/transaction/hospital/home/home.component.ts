import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { EditComponent } from 'app/transaction/hospital/edit/edit.component';
import { HospitalModel } from 'app/transaction/hospital/hospital.model';
import { HospitalService } from 'app/transaction/hospital/hospital.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  indexTreatmentId : number;
  showForm : boolean;

  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild(EditComponent) editHospital : EditComponent;

  rows = [];
  temp = [];
  loadingIndicator: boolean = true;
  timeout: any;
  reorderable: boolean = true;

  selected = [];

  statusFormEdit: boolean = false;
  
  flag_delete: boolean = false;

  model = new HospitalModel();

  pageSize: number = 10;

  controls: any = {
    pageSize:  10,
    filter: '',
  }

  columns = [
    { prop: 'treatmentId' },
    { name: 'petId' },
    { name: 'treatmentPlan' },
    { name: 'recommendation' },
    { name: 'reminder' }
  ];
  
 constructor(
    private _hospitalService:HospitalService
  ) {

  }

  ngOnInit() {
    this._hospitalService.getAllHospital().subscribe(data=> {
      // console.log("data "+JSON.stringify(data));
      // cache our list
      this.temp = [...data];

      // push our inital complete list
      this.rows = data;

      this.loadingIndicator = false;
    })
  }

  getHospital(){
    this._hospitalService.getAllHospital()
        .subscribe(data=> {
          // console.log("data "+JSON.stringify(data));
          // cache our list
          this.temp = [...data];
    
          // push our inital complete list
          this.rows = data;
    
          this.loadingIndicator = false;
        } )
  }

  getRefreshHospital($event){
    // script untuk nambah json ke datatables
    if($event.treatmentId == null || $event.treatmentId == 0 ){
        
        this.rows.push($event);

    }else{
          for(let i=0; i < this.temp.length; i++){
              if (this.temp[i].treatmentId == $event.treatmentId){
                    this.temp[i].petId = $event.petId;
                    this.temp[i].treatmentPlan = $event.treatmentPlan;
                    this.temp[i].recommendation = $event.recommendation;
                    this.temp[i].reminder = $event.reminder;
              }
          }

          for(let i=0; i < this.rows.length; i++){
              if (this.rows[i].treatmentId == $event.treatmentId){
                    this.rows[i].petId = $event.petId;
                    this.rows[i].treatmentPlan = $event.treatmentPlan;
                    this.rows[i].recommendation = $event.recommendation;
                    this.rows[i].reminder = $event.reminder;
              }
          }
    }
      
  }

   updateFilter(event) {

    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function(d) {
      console.log("d "+JSON.stringify(d));

      return !val || ['treatmentId', 'petId', 'treatmentPlan','recommendation','reminder'].some((field: any)=>{
        
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
    // console.log("onSelect "+JSON.stringify(event));
    if (this.flag_delete == true){
      this.statusFormEdit = false;
      this.flag_delete = false;
    } else {
      this.statusFormEdit = true;
    }

    this.indexTreatmentId = event.selected[0].treatmentId;
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
    this.flag_delete= true;
    
    if (this.statusFormEdit == true){
      this.statusFormEdit = false;
    } else {
      this.statusFormEdit = false;
      this.editHospital.tonggleAddReset();
    }
  }

  tonggleAdd(){
    if (this.statusFormEdit == false){
      this.statusFormEdit = true;
    } else {
      this.statusFormEdit = true;
      this.editHospital.tonggleAddReset();
    }
    
  }

}
