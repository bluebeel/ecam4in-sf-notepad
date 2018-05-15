import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { NoteService } from '../note.service';
import { Note } from '../note';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {CategoryService} from "../category.service";
import {Category} from "../category";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  notes: Note[] = [];
  categories: Category[] = [];
  private id: string;

  constructor(private route: ActivatedRoute, private noteService: NoteService, private categoryService: CategoryService) { }

  ngOnInit() {
    this.getNotes();
  }

  getNotes() {
    combineLatest(
      this.route.paramMap
        .switchMap((params: ParamMap) => {
        this.id = params.get('id');
        if (this.id) {
          return this.noteService.getAllNotes().map(notes => notes.filter(note => note.category === this.id));
        } else {
          return this.noteService.getAllNotes();
        }
      }),
      this.categoryService.getAllCategories()
    ).subscribe(([notes, categories]) => {
      notes = notes.map((note) => {
        note.category = categories.find((element) => String(element.id) === note.category);
        return note;
      });
      this.notes = notes;
    });
  }

  deleteNote(id: number): void {
    this.noteService.deleteNoteById(id)
      .subscribe(_ => this.getNotes());
  }

}
