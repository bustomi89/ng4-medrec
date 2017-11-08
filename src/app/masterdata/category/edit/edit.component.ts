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
          this.getSingleCategory(this.indexCategoryId);
        }
      )
        // this.getSingleCategory(this.route.snapshot.params['id']);
    }

    ngOnChanges(change: SimpleChanges): void {
      this.getSingleCategory(change.indexCategoryId.currentValue);
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
        this._categoriService
          .updateCategory(this.category)
          .subscribe(()=> this.goBack());

          this.eventCategories.emit(this.category);
    }
   
     goBack(){
      this._categoriService.getAllCategorys();
      this.router.navigate(['/masterdata/category/home']);
    }
}
