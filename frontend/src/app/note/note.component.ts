import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { NoteService } from '../note.service';
import { Note } from '../note';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  note: Note;

  constructor(private route: ActivatedRoute,
              private noteService: NoteService,
              private router: Router) { }

  ngOnInit() {
    this.getNote();
  }

  getNote(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.noteService.getNoteById(id)
      .subscribe(note => this.note = note);
  }

  updateNote(): void {
    console.log(this.note);
    this.noteService.updateNoteById(this.note.id, this.note)
      .subscribe(note => {
        this.router.navigate(["/"]);
      });
  }

  onSubmit(submitted: boolean) {
    submitted ? this.updateNote() : null ;
  }

}
