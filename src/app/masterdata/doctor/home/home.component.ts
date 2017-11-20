import { Component, ViewEncapsulation, OnInit, ViewChild, Input } from '@angular/core';
import { DoctorService } from 'app/masterdata/doctor/doctor.service';
import { DatatableComponent } from "@swimlane/ngx-datatable/release";
import { DoctorModel } from 'app/masterdata/doctor/doctor.model';
import { EditComponent } from 'app/masterdata/doctor/edit/edit.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  indexDoctorId : number;
  showForm : boolean;

  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild(EditComponent) editDoctor : EditComponent;

  rows = [];
  temp = [];
  loadingIndicator: boolean = true;
  timeout: any;
  reorderable: boolean = true;

  selected = [];

  statusFormEdit: boolean = false;
  
  flag_delete: boolean = false;

  model = new DoctorModel();

  pageSize: number = 10;

  controls: any = {
    pageSize:  10,
    filter: '',
  }

  columns = [
    { prop: 'doctorId' },
    { name: 'doctorName' },
    { name: 'doctorAddress' },
    { name: 'doctorEmail' },
    { name: 'doctorHandphone' },
    { name: 'doctorSip' },
    { name: 'doctorCode' }
  ];
  
 constructor(
    private _doctorService:DoctorService
  ) {

  }

  ngOnInit() {
    this._doctorService.getAllDoctor().subscribe(data=> {
      // console.log("data "+JSON.stringify(data));
      // cache our list
      this.temp = [...data];

      // push our inital complete list
      this.rows = data;

      this.loadingIndicator = false;
    })
  }

  getDoctor(){
    this._doctorService.getAllDoctor()
        .subscribe(data=> {
          // console.log("data "+JSON.stringify(data));
          // cache our list
          this.temp = [...data];
    
          // push our inital complete list
          this.rows = data;
    
          this.loadingIndicator = false;
        } )
  }

  getRefreshDoctor($event){
    // script untuk nambah json ke datatables
    if($event.doctorId == null || $event.doctorId == 0 ){
        
        this.rows.push($event);

    }else{
          for(let i=0; i < this.temp.length; i++){
              if (this.temp[i].doctorId == $event.doctorId){
                    this.temp[i].doctorName = $event.doctorName;
                    this.temp[i].doctorAddress = $event.doctorAddress;
                    this.temp[i].doctorEmail = $event.doctorEmail;
                    this.temp[i].doctorHandphone = $event.doctorHandphone;
                    this.temp[i].doctorSip = $event.doctorSip;
                    this.temp[i].doctorCode = $event.doctorCode;
              }
          }

          for(let i=0; i < this.rows.length; i++){
              if (this.rows[i].doctorId == $event.doctorId){
                    this.rows[i].doctorName = $event.doctorName;
                    this.rows[i].doctorAddress = $event.doctorAddress;
                    this.rows[i].doctorEmail = $event.doctorEmail;
                    this.rows[i].doctorHandphone = $event.doctorHandphone;
                    this.rows[i].doctorSip = $event.doctorSip;
                    this.rows[i].doctorCode = $event.doctorCode;
              }
          }
    }
      
  }

   updateFilter(event) {

    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function(d) {
      console.log("d "+JSON.stringify(d));

      return !val || ['doctorId', 'doctorName', 'doctorAddress','doctorEmail','doctorHandphone','doctorSip','doctorCode'].some((field: any)=>{
        
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
    if (this.flag_delete == true){
      this.statusFormEdit = false;
      this.flag_delete = false;
    } else {
      this.statusFormEdit = true;
    }

    this.indexDoctorId = event.selected[0].doctorId;
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
      this.editDoctor.tonggleAddReset();
    }
  }

  tonggleAdd(){
    if (this.statusFormEdit == false){
      this.statusFormEdit = true;
    } else {
      this.statusFormEdit = true;
      this.editDoctor.tonggleAddReset();
    }
    
  }

}
