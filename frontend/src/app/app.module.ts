import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NotesComponent } from './notes/notes.component';

import { MessageService } from './message.service';
import {NoteService} from "./note.service";
import { AppRoutingModule } from './/app-routing.module';
import { NoteComponent } from './note/note.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoriesNewComponent } from './categories-new/categories-new.component';
import { CategoriesEditComponent } from './categories-edit/categories-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    NotesComponent,
    NoteComponent,
    CategoriesComponent,
    CategoriesNewComponent,
    CategoriesEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [MessageService, NoteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
