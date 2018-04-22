import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NoteService } from '../note.service';
import { Note } from '../note';
import {Router} from "@angular/router";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  notes: Note[];

  constructor(private noteService: NoteService, private router: Router) { }

  ngOnInit() {
    this.getNotes();
  }

  getNotes(): void {
    this.noteService.getAllNotes()
      .subscribe(notes => this.notes = notes);
  }

  deleteNote(id: number): void {
    this.noteService.deleteNoteById(id)
      .subscribe(_ => this.getNotes());
  }

}
