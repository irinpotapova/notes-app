import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NotesAppComponent } from './notes-app/notes-app.component';
import { MasonryModule } from 'angular2-masonry';

import { NotesEditorComponent } from './notes-editor/notes-editor.component';
import { NotesGridComponent } from './notes-grid/notes-grid.component';
import { NoteComponent } from './note/note.component';

@NgModule({
  declarations: [
    NotesAppComponent,
    NotesEditorComponent,
    NotesGridComponent,
    NoteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MasonryModule
  ],
  providers: [],
  bootstrap: [ NotesAppComponent ]
})
export class AppModule { }
