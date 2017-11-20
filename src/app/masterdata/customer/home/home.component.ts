import { Component, ViewEncapsulation, OnInit, ViewChild, Input } from '@angular/core';
import { CustomerService } from 'app/masterdata/customer/customer.service';
import { DatatableComponent } from "@swimlane/ngx-datatable/release";
import { CustomerModel } from 'app/masterdata/customer/customer.model';
import { EditComponent } from 'app/masterdata/customer/edit/edit.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  indexCustomerId : number;
  showForm : boolean;

  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild(EditComponent) editCustomer : EditComponent;

  rows = [];
  temp = [];
  loadingIndicator: boolean = true;
  timeout: any;
  reorderable: boolean = true;

  selected = [];

  statusFormEdit: boolean = false;

  flag_delete: boolean = false;

  model = new CustomerModel();

  pageSize: number = 10;

  controls: any = {
    pageSize:  10,
    filter: '',
  }

  columns = [
    { prop: 'customerId' },
    { name: 'customerName' },
    { name: 'clientAddress' },
    { name: 'postalCode' },
    { name: 'phoneNumber' },
    { name: 'identityNumber' },
    { name: 'reference' },
    { name: 'deposite' },
  ];
  
 constructor(
    private _customerService:CustomerService
  ) {

  }

  ngOnInit() {
    this._customerService.getAllCustomer().subscribe(data=> {
      // console.log("data "+JSON.stringify(data));
      // cache our list
      this.temp = [...data];

      // push our inital complete list
      this.rows = data;

      this.loadingIndicator = false;
    })
  }

  getCustomer(){
    this._customerService.getAllCustomer()
        .subscribe(data=> {
          // console.log("data "+JSON.stringify(data));
          // cache our list
          this.temp = [...data];
    
          // push our inital complete list
          this.rows = data;
    
          this.loadingIndicator = false;
        } )
  }
  getRefreshCustomer($event){
    // script untuk nambah json ke datatables
    if($event.customerId == null || $event.customerId == 0 ){
        
        this.rows.push($event);

    }else{
          for(let i=0; i < this.temp.length; i++){
              if (this.temp[i].customerId == $event.customerId){
                    this.temp[i].customerName = $event.customerName;
                    this.temp[i].clientAddress = $event.clientAddress;
                    this.temp[i].postalCode = $event.postalCode;
                    this.temp[i].identityNumber = $event.identityNumber;
                    this.temp[i].reference = $event.reference;
                    this.temp[i].deposite = $event.deposite;
              }
          }

          for(let i=0; i < this.rows.length; i++){
              if (this.rows[i].customerId == $event.customerId){
                    this.rows[i].customerType = $event.customerType;
                    this.rows[i].customerName = $event.customerName;
                    this.rows[i].clientAddress = $event.clientAddress;
                    this.rows[i].postalCode = $event.postalCode;
                    this.rows[i].identityNumber = $event.identityNumber;
                    this.rows[i].reference = $event.reference;
                    this.rows[i].deposite = $event.deposite;
              }
          }
    }
      
  }

   updateFilter(event) {

    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function(d) {
      console.log("d "+JSON.stringify(d));

      return !val || ['customerId', 'customerName', 'clientAddress','postalCode','phoneNumber','identityNumber','reference','deposite'].some((field: any)=>{
        
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

    this.indexCustomerId = event.selected[0].customerId;
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
      this.editCustomer.tonggleAddReset();
    }
  }

  tonggleAdd(){
    if (this.statusFormEdit == false){
      this.statusFormEdit = true;
    } else {
      this.statusFormEdit = true;
      this.editCustomer.tonggleAddReset();
    }
    
  }

}
