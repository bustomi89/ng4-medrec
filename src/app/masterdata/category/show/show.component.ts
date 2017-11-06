import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoriService } from 'app/masterdata/category/category.service';
import { CategoryModel } from 'app/masterdata/category/category.model';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  
    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private _categoriService: CategoriService
    ) { }
  
    ngOnInit() {
      this.getSingleEmployee();
    }
    
    category:CategoryModel;
  
    getSingleEmployee(){
      var id = this.route.snapshot.params['id'];
      this._categoriService
        .getCategoryById(id)
        .subscribe(category =>{
            this.category = category;
            })
    };
  
    goBack(){
      this.router.navigate(['/masterdata/category/home']);
    }

}
