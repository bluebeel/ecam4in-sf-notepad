import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from "../category";

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  @Input('type') type: string;

  private _model: Category;

  @Input()
  set model(model: Category) {
    this._model = model || new Category();
  }

  get model(): Category { return this._model };

  @Output() onSubmitted = new EventEmitter<boolean>();

  submitBtn: string;

  constructor() { }

  ngOnInit() {
    this.submitBtn = this.type === 'edit' ? 'Edit note' : 'Create note';
  }

  onSubmit() {
    this.onSubmitted.emit(true);
  }

}
