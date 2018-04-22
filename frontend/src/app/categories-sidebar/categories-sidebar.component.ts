import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../category.service";
import {Category} from "../category";

@Component({
  selector: 'app-categories-sidebar',
  templateUrl: './categories-sidebar.component.html',
  styleUrls: ['./categories-sidebar.component.scss']
})
export class CategoriesSidebarComponent implements OnInit {

  categories: Category[] = [];

  constructor(private categoryService: CategoryService,) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getAllCategories()
      .subscribe(categories => this.categories = categories);
  }

}
