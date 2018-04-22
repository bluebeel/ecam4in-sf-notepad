import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Category} from "../category";
import {CategoryService} from "../category.service";

@Component({
  selector: 'app-categories-new',
  templateUrl: './categories-new.component.html',
  styleUrls: ['./categories-new.component.scss']
})
export class CategoriesNewComponent implements OnInit {

  category: Category;

  constructor(private route: ActivatedRoute,
              private categoryService: CategoryService,
              private router: Router) { }

  ngOnInit() {
    this.category = new Category();
  }

  addNote(): void {
    this.categoryService.addCategory(this.category)
      .subscribe(note => {
        this.router.navigate(["/"]);
      });
  }

  onSubmit(submitted: boolean) {
    submitted ? this.addNote() : null ;
  }

}
