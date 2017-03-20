import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NotesAppComponent } from './notes-app/notes-app.component';
import { MasonryModule } from 'angular2-masonry';
import { AlertModule } from 'ng2-bootstrap';
import { DropdownModule } from 'ng2-bootstrap';
import { ModalModule } from 'ng2-bootstrap/modal';
import { Pipe } from '@angular/core';
import { PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { NotesEditorComponent } from './notes-editor/notes-editor.component';
import { NotesGridComponent } from './notes-grid/notes-grid.component';
import { NoteComponent } from './note/note.component';

@Pipe({ name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform  {
  constructor(private sanitized: DomSanitizer) {}
  transform(value) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}

@NgModule({
  declarations: [
    NotesAppComponent,
    NotesEditorComponent,
    NotesGridComponent,
    NoteComponent,
    SafeHtmlPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MasonryModule,
    AlertModule.forRoot(),
    DropdownModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [ NotesAppComponent ]
})
export class AppModule { }
