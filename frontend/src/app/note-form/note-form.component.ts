import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { CategoryService } from "../category.service";
import { Category } from "../category";
import { Note } from '../note';


@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss']
})
export class NoteFormComponent implements OnInit {
  @ViewChild('content') tag: ElementRef;
  @Input('type') type: string;

  private _model: Note;

  @Input()
  set model(model: Note) {
    this._model = model || new Note();
  }

  get model(): Note { return this._model };

  @Output() onSubmitted = new EventEmitter<boolean>();

  categories: Category[] = [];
  submitBtn: string;
  selectedText: string;

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.submitBtn = this.type === 'edit' ? 'Edit note' : 'Create note';
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getAllCategories()
      .subscribe(categories => this.categories = categories);
  }

  onSubmit() {
    this.onSubmitted.emit(true);
  }

  addTag(event) {
    event.preventDefault();
    this._model.content = this._model.content.replace(new RegExp(this.selectedText, 'gi'), `<tag>${this.selectedText}</tag>`);
  }

  onSelect(e) {
    this.selectedText = e;
  }
}
