import { Component, OnInit, Input, AfterViewInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CategoriService } from 'app/masterdata/category/category.service';
import { CategoryModel } from 'app/masterdata/category/category.model';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit,  OnChanges{
  
  @Input() indexCategoryId: number;

  @Output() eventCategories = new EventEmitter<CategoryModel>();

  statusProcess : string;

    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private _categoriService: CategoriService
    ) { }
  
    ngOnInit() {
      this.route.params
      .subscribe(
        (params: Params) => {
          // this.indexCategoryId = +params['id']; // casting dari string ke number
          if (this.indexCategoryId != undefined || this.indexCategoryId != null){
            this.getSingleCategory(this.indexCategoryId);
          }
        }
      )
        // this.getSingleCategory(this.route.snapshot.params['id']);
    }

    ngOnChanges(change: SimpleChanges): void { 
      if (this.indexCategoryId != undefined || this.indexCategoryId != null){
      this.getSingleCategory(change.indexCategoryId.currentValue);
        this.statusProcess = '';
      }
    }
  
    //model:any={};
    category = new CategoryModel();
    
    
  
    getSingleCategory(id){
      this._categoriService
        .getCategoryById(id)
        .subscribe(category =>{
            this.category = category;
            })
    };
    
    updateCategory(){
      if(this.category.categoryId == null || this.category.categoryId== 0 ){
          if (Object.keys(this.category).length != 0){
            this._categoriService
            .createCategory(this.category)
            .subscribe(()=> this.goBack());

            this.eventCategories.emit(this.category);
            this.statusProcess = "Add Data is Success!";
          }

      } else{
        this._categoriService
        .updateCategory(this.category)
        .subscribe(()=> this.goBack());

        this.eventCategories.emit(this.category);
        this.statusProcess = "Save Data is Success!";
      }
      
    }
   
     goBack(){
      this._categoriService.getAllCategorys();
      this.router.navigate(['/masterdata/category/home']);
    }

    tonggleAddReset(){
      this.category = new CategoryModel();
      this.statusProcess = '';
    }
}
