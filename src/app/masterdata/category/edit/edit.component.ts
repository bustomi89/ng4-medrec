import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CategoriService } from 'app/masterdata/category/category.service';
import { CategoryModel } from 'app/masterdata/category/category.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  
  @Input() indexCategoryId: number;

    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private _categoriService: CategoriService
    ) { }
  
    ngOnInit() {
      this.route.params
      .subscribe(
        (params: Params) => {
          this.indexCategoryId = +params['id']; // casting dari string ke number
          this.getSingleCategory(this.indexCategoryId);
        }
      )

        // this.getSingleCategory(this.route.snapshot.params['id']);
    }
  
    //model:any={};
    model = new CategoryModel();
    
    
  
    getSingleCategory(id){
      this._categoriService
        .getCategoryById(id)
        .subscribe(category =>{
            this.model = category;
            })
    };
    
    updateCategory(){
        this._categoriService
          .updateCategory(this.model)
          .subscribe(()=> this.goBack());
          this._categoriService.getAllCategorys();
    }
   
     goBack(){
      this._categoriService.getAllCategorys();
      this.router.navigate(['/masterdata/category/home']);
    }
}
