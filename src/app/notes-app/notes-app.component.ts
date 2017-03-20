import { Component, OnInit, ViewChild } from '@angular/core';

let log = console.log.bind(console);

@Component({
  selector: 'notes-app',
  templateUrl: './notes-app.component.html',
  styleUrls: ['./notes-app.component.css']
})
export class NotesAppComponent implements OnInit {

  notes: Array<Object>;
  localNotes: Array<Object>;

  @ViewChild('notesGrid') private notesGrid;

  ngOnInit() {

    this.localNotes = JSON.parse(localStorage.getItem('notes'));

    if (this.localNotes) {
      this.notes = this.localNotes.slice();
    } else {
      this.notes = [];
    }
  }

  createNote(text: string): void {
    this.notes.unshift({
      id: new Date(),
      text: text,
      color: 'yellow'
    });

    this.notesGrid.reloadItems();

    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  deleteNote(id: number): void {
    let newNotes = this.notes.filter((_item) => {
      return _item['id'] !== id;
    });
    this.notes = newNotes.slice();
    this.notesGrid.reloadItems();
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

}
