import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NoteService } from '../note.service';
import { CategoryService } from "../category.service";
import { Category } from "../category";
import { Note } from '../note';


@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss']
})
export class NoteFormComponent implements OnInit {

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

  constructor(private route: ActivatedRoute, private noteService: NoteService, private categoryService: CategoryService, private router: Router) { }

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

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

}
