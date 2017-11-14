import { Component, ViewEncapsulation, OnInit, ViewChild, Input } from '@angular/core';
import { PetService } from 'app/masterdata/pet/pet.service';
import { DatatableComponent } from "@swimlane/ngx-datatable/release";
import { PetModel } from 'app/masterdata/pet/pet.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  rows = [];
  temp = [];
  loadingIndicator: boolean = true;
  timeout: any;
  reorderable: boolean = true;

  selected = [];

  model = new PetModel();

  pageSize: number = 10;

  controls: any = {
    pageSize:  10,
    filter: '',
  }

  columns = [
    { prop: 'petId' },
    { name: 'customerId' },
    { name: 'doctorId' },
    { name: 'speciesId' },
    { name: 'petName' },
    { name: 'petSex' },
    { name: 'petBirthdate' },
    { name: 'petAge' },
    { name: 'breed' },
    { name: 'color' },
  ];


  @ViewChild(DatatableComponent) table: DatatableComponent;
  
 constructor(
    private _petService:PetService
  ) {

  }

  ngOnInit() {
    this._petService.getAllPet().subscribe(data=> {
      // console.log("data "+JSON.stringify(data));
      // cache our list
      this.temp = [...data];

      // push our inital complete list
      this.rows = data;

      this.loadingIndicator = false;
    })
  }

  getPet(){
    this._petService.getAllPet()
        .subscribe(data=> {
          // console.log("data "+JSON.stringify(data));
          // cache our list
          this.temp = [...data];
    
          // push our inital complete list
          this.rows = data;
    
          this.loadingIndicator = false;
        } )
  }

   updateFilter(event) {

    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function(d) {
      console.log("d "+JSON.stringify(d));

      return !val || ['petId', 'customerId', 'doctorId','speciesId','petName','petSex','petBirthdate','petAge','breed','color'].some((field: any)=>{
        
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
    this.model =event;
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
      this._petService
        .deletePetById(row.petId)
        .subscribe(() => {
          this.getPet();
        } )
  }

}
