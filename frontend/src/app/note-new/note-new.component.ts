import { Component, OnInit } from '@angular/core';
import {Note} from "../note";
import {NoteService} from "../note.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-note-new',
  templateUrl: './note-new.component.html',
  styleUrls: ['./note-new.component.scss']
})
export class NoteNewComponent implements OnInit {

  note: Note;

  constructor(private route: ActivatedRoute,
              private noteService: NoteService,
              private router: Router) { }

  ngOnInit() {
    this.note = new Note();
  }

  addNote(): void {
    this.noteService.addNote(this.note)
      .subscribe(note => {
        this.router.navigate(["/"]);
      });
  }
}
