import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent {

  @Input() item: Object;
  @Output() deleteNoteHandler = new EventEmitter();
  @Output() editNoteHandler = new EventEmitter();

  deleteNote(): void {
    this.deleteNoteHandler.emit(this.item['id']);
  }

  editNote(): void {
    this.editNoteHandler.emit(this.item['id']);
  }

}
