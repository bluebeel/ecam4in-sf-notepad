import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';
import { Note } from './note';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class NoteService {

  private notesUrl = 'localhost:8000/api/note';  // URL to web api

  // Placeholder for notes
  notes: Note[] = [];

  constructor(private http: HttpClient, private messageService: MessageService) {}

  /** Log a NoteService message with the MessageService */
  private log(message: string) {
    this.messageService.add('NoteService: ' + message);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  // POST create a new note on the server
  addNote(note: Note): Observable<Note> {
    return this.http.post<Note>(this.notesUrl, note, httpOptions)
      .pipe(
        tap((note: Note) => this.log(`added note w/ id=${note.id}`)),
        catchError(this.handleError<Note>('addNote'))
      );
  }

  // DELETE note by id from the server
  deleteNoteById(note: Note | number): Observable<Note> {
    const id = typeof note === 'number' ? note : note.id;
    const url = `${this.notesUrl}/${id}`;

    return this.http.delete<Note>(url, httpOptions)
      .pipe(
        tap(_ => this.log(`deleted note id=${id}`)),
        catchError(this.handleError<Note>('deleteNoteById'))
      );
  }

  // PUT update the note on the server
  updateNoteById(id: number, note: Note): Observable<any> {
    const url = `${this.notesUrl}/${id}`;
    return this.http.put(url, note, httpOptions).pipe(
      tap(_ => this.log(`updated note id=${note.id}`)),
      catchError(this.handleError<any>('updateNoteById'))
    );
  }

  // GET all the notes from the server
  getAllNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.notesUrl)
      .pipe(
        tap(notes => this.log(`fetched notes`)),
        catchError(this.handleError('getAllNotes', []))
      );
  }

  // GET note by id. Will 404 if id not found
  getNoteById(id: number): Observable<Note> {
    const url = `${this.notesUrl}/${id}`;
    return this.http.get<Note>(url)
      .pipe(
        tap(_ => this.log(`fetched note id=${id}`)),
        catchError(this.handleError<Note>(`getNoteById id=${id}`))
      );
  }

}
