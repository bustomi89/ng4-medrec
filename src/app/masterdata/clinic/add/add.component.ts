import { Component, OnInit } from '@angular/core';
import { CategoryModel } from 'app/masterdata/category/category.model';
import { CategoriService } from 'app/masterdata/category/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  
    constructor(
      private _categoriService: CategoriService,
       private router: Router) { }
  
    ngOnInit() {
    }
  
  model = new CategoryModel();
    addCategory(){
        this._categoriService
          .createCategory(this.model)
          .subscribe(()=> this.goBack());
    }
     goBack(){
      this.router.navigate(['/masterdata/category/home']);
    }
}
