import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { NoteService } from '../note.service';
import { Note } from '../note';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {CategoryService} from "../category.service";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  notes: Observable<Note[]>;
  private id: number;

  constructor(private route: ActivatedRoute, private noteService: NoteService, private categoryService: CategoryService) { }

  ngOnInit() {
    this.getNotes();
  }

  getNotes(): void {
    this.notes = this.route.paramMap
      .switchMap((params: ParamMap) => {
        this.id = +params.get('id');
        if (this.id) {
          console.log(this.id);
          return this.categoryService.getCategoryById(this.id).map((category) => {
            return category.notes;
          });
        }
        return this.noteService.getAllNotes();
      });
  }

  deleteNote(id: number): void {
    this.noteService.deleteNoteById(id)
      .subscribe(_ => this.getNotes());
  }

}
