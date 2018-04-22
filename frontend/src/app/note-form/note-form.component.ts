import { Component, OnInit } from '@angular/core';
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

  model: Note = new Note();
  submitted = false;
  categories: Category[] = [];

  constructor(private route: ActivatedRoute, private noteService: NoteService, private categoryService: CategoryService, private router: Router) { }

  ngOnInit() {
    this.getCategories();
    this.getNote();
  }

  getCategories(): void {
    this.categoryService.getAllCategories()
      .subscribe(categories => this.categories = categories);
  }

  getNote(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.noteService.getNoteById(id)
      .subscribe(note => {
        this.model = note;
      });
  }


  onSubmit() {
    this.noteService.updateNoteById(this.model.id, this.model)
      .subscribe(note => {
        this.submitted = true;
        this.router.navigate(["/"]);
      });
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

}
