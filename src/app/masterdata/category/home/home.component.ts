import { Component, ViewEncapsulation, OnInit, ViewChild, Input } from '@angular/core';
import { CategoriService } from 'app/masterdata/category/category.service';
import { DatatableComponent } from "@swimlane/ngx-datatable/release";
import { CategoryModel } from 'app/masterdata/category/category.model';
import { EditComponent } from 'app/masterdata/category/edit/edit.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  
      encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  indexCategoryId : number;

  categoryEdit: CategoryModel;

  @ViewChild(DatatableComponent) table: DatatableComponent;
  
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
      { prop: 'categoryId' },
      { name: 'categoryType' },
      { name: 'categoryName' },
      { name: 'categoryCode' },
      { name: 'description' },
      { name: 'size' },
      { name: 'price' },
      { name: 'discount' },
    ];
  
   constructor(
      private _categoriService:CategoriService
    ) {
  
    }
  
    ngOnInit() {
      this.getCategories();
    }

    getCategories(){
      this._categoriService.getAllCategorys()
          .subscribe(data=> {

            // cache our list
            this.temp = [...data];
      
            // push our inital complete list
            this.rows = data;
            
            this.loadingIndicator = false;
          } )
    }

    getRefreshCategories($event){
        // script untuk nambah json ke datatables
        // this.rows.push($event);
        // this.rows = [...this.rows]

        for(let i=0; i < this.temp.length; i++){
            if (this.temp[i].categoryId == $event.categoryId){
                  this.temp[i].categoryType = $event.categoryType;
                  this.temp[i].categoryName = $event.categoryName;
                  this.temp[i].categoryCode = $event.categoryCode;
                  this.temp[i].description = $event.description;
                  this.temp[i].size = $event.size;
                  this.temp[i].price = $event.price;
                  this.temp[i].discount = $event.discount;
            }
        }

        for(let i=0; i < this.rows.length; i++){
            if (this.rows[i].categoryId == $event.categoryId){
                  this.rows[i].categoryType = $event.categoryType;
                  this.rows[i].categoryName = $event.categoryName;
                  this.rows[i].categoryCode = $event.categoryCode;
                  this.rows[i].description = $event.description;
                  this.rows[i].size = $event.size;
                  this.rows[i].price = $event.price;
                  this.rows[i].discount = $event.discount;
            }
        }
    }
  
     updateFilter(event) {

      const val = event.target.value.toLowerCase();
  
      // filter our data
      const temp = this.temp.filter(function(d) {
        console.log("d "+JSON.stringify(d));

        return !val || ['categoryId', 'categoryType', 'categoryName','categoryCode','description','size','price','discount'].some((field: any)=>{
          
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
      this.indexCategoryId = event.selected[0].categoryId;
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
        this._categoriService
          .deleteCategoryById(row.categoryId)
          .subscribe(() => {
            this.getCategories();
          } )
    }
    
}
