import { Injectable } from '@angular/core';
import { Observable, Subject, ReplaySubject } from 'rxjs';

@Injectable()
export class EventService {

  private eventSubject: Subject<any> = new ReplaySubject(1);

  constructor() { }

  // set observable of this subject
  get $getEventSubject(): Observable<any> {
    return this.eventSubject.asObservable();
  }

  // remove from observer
  resetEventObserver(): void {
    this.eventSubject = new ReplaySubject(1);
  }

  // send event to observers
  sendEvent():void {
    this.eventSubject.next(true);
  }

}
