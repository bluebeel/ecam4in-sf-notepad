import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms'
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NotesComponent } from './notes/notes.component';

import { MessageService } from './message.service';
import {NoteService} from "./note.service";
import { AppRoutingModule } from './app-routing.module';
import { NoteComponent } from './note/note.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoriesNewComponent } from './categories-new/categories-new.component';
import { CategoriesEditComponent } from './categories-edit/categories-edit.component';
import { NoteFormComponent } from './note-form/note-form.component';
import {CategoryService} from "./category.service";
import { NoteNewComponent } from './note-new/note-new.component';
import { CategoriesSidebarComponent } from './categories-sidebar/categories-sidebar.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import {EventService} from "./event.service";
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    NotesComponent,
    NoteComponent,
    CategoriesComponent,
    CategoriesNewComponent,
    CategoriesEditComponent,
    NoteFormComponent,
    NoteNewComponent,
    CategoriesSidebarComponent,
    CategoryFormComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [MessageService, NoteService, CategoryService, EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
