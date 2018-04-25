import { Component, OnInit } from '@angular/core';
import {Category} from "../category";
import {CategoryService} from "../category.service";
import { EventService} from "../event.service";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories: Category[];

  constructor(private categoryService: CategoryService, private serviceInstance: EventService) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getAllCategories()
      .subscribe(categories => this.categories = categories);
  }

  deleteCategory(id: number): void {
    this.categoryService.deleteCategoryById(id)
      .subscribe(_ => {
        this.getCategories();
        this.serviceInstance.sendEvent();
      });
  }
}
