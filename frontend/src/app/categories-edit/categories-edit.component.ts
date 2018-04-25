import { Component, OnInit } from '@angular/core';
import {Category} from "../category";
import {CategoryService} from "../category.service";
import {ActivatedRoute, Router} from "@angular/router";
import {EventService} from "../event.service";

@Component({
  selector: 'app-categories-edit',
  templateUrl: './categories-edit.component.html',
  styleUrls: ['./categories-edit.component.scss']
})
export class CategoriesEditComponent implements OnInit {

  category: Category;

  constructor(private categoryService: CategoryService,
              private route: ActivatedRoute,
              private router: Router,
              private serviceInstance: EventService) { }

  ngOnInit() {
    this.getCategory();
  }

  getCategory(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.categoryService.getCategoryById(id)
      .subscribe(category => this.category = category);
  }

  updateCategory(): void {
    this.categoryService.updateCategoryById(this.category.id, this.category)
      .subscribe(_ => {
        this.serviceInstance.sendEvent();
        this.router.navigate(["/"]);
      });
  }

  onSubmit(submitted: boolean) {
    submitted ? this.updateCategory() : null ;
  }

}
