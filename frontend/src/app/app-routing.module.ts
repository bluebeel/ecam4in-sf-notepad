import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {NotesComponent}   from './notes/notes.component';
import {NoteComponent} from "./note/note.component";
import {CategoriesComponent} from "./categories/categories.component";
import {CategoriesNewComponent} from "./categories-new/categories-new.component";
import {CategoriesEditComponent} from "./categories-edit/categories-edit.component";

const routes: Routes = [
  { path: '', component: NotesComponent },
  { path: 'notes/:id/edit', component: NoteComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'categories/new', component: CategoriesNewComponent },
  { path: 'categories/:id/edit', component: CategoriesEditComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
