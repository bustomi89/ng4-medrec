import { Component, ViewEncapsulation, OnInit, ViewChild, Input } from '@angular/core';
import { PetService } from 'app/masterdata/pet/pet.service';
import { DatatableComponent } from "@swimlane/ngx-datatable/release";
import { PetModel } from 'app/masterdata/pet/pet.model';
import { EditComponent } from 'app/masterdata/pet/edit/edit.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  indexPetId : number;
  showForm : boolean;

  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild(EditComponent) editPet : EditComponent;

  rows = [];
  temp = [];
  loadingIndicator: boolean = true;
  timeout: any;
  reorderable: boolean = true;

  selected = [];

  statusFormEdit: boolean = false;
  
  flag_delete: boolean = false;

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

  getRefreshPet($event){
    // script untuk nambah json ke datatables
    if($event.petId == null || $event.petId == 0 ){
        
        this.rows.push($event);

    }else{
          for(let i=0; i < this.temp.length; i++){
              if (this.temp[i].petId == $event.petId){
                    this.temp[i].customerId = $event.customerId;
                    this.temp[i].doctorId = $event.doctorId;
                    this.temp[i].speciesId = $event.speciesId;
                    this.temp[i].petName = $event.petName;
                    this.temp[i].petSex = $event.petSex;
                    this.temp[i].petBirthdate = $event.petBirthdate;
                    this.temp[i].petAge = $event.petAge;
                    this.temp[i].breed = $event.breed;
                    this.temp[i].color = $event.color;
              }
          }

          for(let i=0; i < this.rows.length; i++){
              if (this.rows[i].petId == $event.petId){
                    this.rows[i].customerId = $event.customerId;
                    this.rows[i].doctorId = $event.doctorId;
                    this.rows[i].speciesId = $event.speciesId;
                    this.rows[i].petName = $event.petName;
                    this.rows[i].petSex = $event.petSex;
                    this.rows[i].petBirthdate = $event.petBirthdate;
                    this.rows[i].petAge = $event.petAge;
                    this.rows[i].breed = $event.breed;
                    this.rows[i].color = $event.color;
              }
          }
    }
      
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
    if (this.flag_delete == true){
      this.statusFormEdit = false;
      this.flag_delete = false;
    } else {
      this.statusFormEdit = true;
    }

    this.indexPetId = event.selected[0].petId;
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
      this.editPet.tonggleAddReset();
    }
  }

  tonggleAdd(){
    if (this.statusFormEdit == false){
      this.statusFormEdit = true;
    } else {
      this.statusFormEdit = true;
      this.editPet.tonggleAddReset();
    }
    
  }

}
