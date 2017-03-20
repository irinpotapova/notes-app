import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { AngularMasonry, MasonryOptions } from 'angular2-masonry';

@Component({
  selector: 'notes-grid',
  templateUrl: './notes-grid.component.html',
})
export class NotesGridComponent {

  @Input() notes: Array<Object>;
  @Output() deleteNoteHandler = new EventEmitter();
  @Output() editNoteHandler = new EventEmitter();
  @ViewChild( AngularMasonry ) private masonry: AngularMasonry;

  public masonryOptions: MasonryOptions = {
    itemSelector: '.note'
  };

  reloadItems(): void {
    this.masonry._msnry.reloadItems();
  }

  deleteNote(id: number): void {
    this.deleteNoteHandler.emit(id);
  }

  editNote(id: number): void {
    this.editNoteHandler.emit(id);
  }
}
