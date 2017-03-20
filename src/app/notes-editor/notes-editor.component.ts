import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild, SimpleChange, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

interface Note {
  text: string;
  backgroundColor: string,
  color: string
}

@Component({
  selector: 'notes-editor',
  templateUrl: './notes-editor.component.html',
  styleUrls: ['./notes-editor.component.css']
})
export class NotesEditorComponent implements OnInit {

  @Input() fontSize: number = 3;
  @Input() fontFamily: string = 'Helvetica Neue';
  @Input() textAlign: string = 'center';
  @Input() textColor: string = '#d7d7d7';
  @Input() backgroundColor: string = '#21201f';
  @Input() boldText: string = 'normal';
  @Input() uppercaseText: string = 'none';
  @Input() underlinedText: string = 'none';
  @Input() selectedNote: any = {};
  @Input() editingMode: boolean = false;

  @Output() fontSizeChanged = new EventEmitter();
  @Output() fontFamilyChanged = new EventEmitter();
  @Output() textAlignChanged = new EventEmitter();
  @Output() textColorChanged = new EventEmitter();
  @Output() backgroundColorChanged = new EventEmitter();
  @Output() boldTextChanged = new EventEmitter();
  @Output() uppercaseTextChanged = new EventEmitter();
  @Output() underlinedTextChanged = new EventEmitter();
  @Output() strikeThroughTextChanged = new EventEmitter();
  @Output() createNoteHandler = new EventEmitter();
  @Output() updateNoteHandler = new EventEmitter();
  @ViewChild('textarea') el: ElementRef;

  fontSizes: Object[];
  fontNames: string[];
  textAlignValues: string[];
  selectedAlignValue: string;
  backgroundColors: Object[];
  textColors: Object[];
  selectedBackgroundColor: string;
  selectedTextColor: string;
  selectedBold: boolean;
  selectedItalic: boolean;
  selectedUnderline: boolean;
  selectedStrikeThrough: boolean;
  selectedOrderedList: boolean;
  selectedUnorderedList: boolean;
  theNote: Note;
  private color: string = '#d7d7d7';
  private bckgColor: string = '#21201f';

  public status: {isopen: boolean} = { isopen: false };

  constructor(@Inject(DOCUMENT) private document: any) {
    this.fontSizes = [
      {value: 1, visibleValue: '10px'},
      {value: 2, visibleValue: '13px'},
      {value: 3, visibleValue: '16px'},
      {value: 4, visibleValue: '18px'},
      {value: 5, visibleValue: '24px'},
      {value: 6, visibleValue: '32px'},
      {value: 7, visibleValue: '48px'}
    ];
    this.fontNames = [
      'Helvetica Neue',
      'Arial',
      'Calibri',
      'Times New Roman',
      'Courier New',
      'Verdana'
    ];
    this.textAlignValues = [
      'left',
      'right',
      'center',
      'justify'
    ];
    this.backgroundColors = [
      {name: 'yellow', code: 'yellow'},
      {name: 'gold', code: '#ffd700'},
      {name: 'eastern blue', code: '#20b2aa'},
      {name: 'pastel green', code: '#90ee90'},
      {name: 'malibu', code: '#87cefa'},
      {name: 'pink', code: '#ffb6c1'},
      {name: 'breaker bay', code: '#5f9ea0'},
      {name: 'vivid tangerine', code: '#ffa07a'},
      {name: 'spring green', code: '#00fa9a'}
    ];
    this.textColors = [
      {name: 'black', code: '#000000', changeVisibleColor: true},
      {name: 'white', code: '#ffffff'},
      {name: 'blue gem', code: '#2C0E8C', changeVisibleColor: true},
      {name: 'brick red', code: '#C62D42'},
      {name: 'forest green', code: '#228B22'},
      {name: 'irish coffee', code: '#5F3D26', changeVisibleColor: true},
      {name: 'lemon', code: '#FDE910'},
      {name: 'pale slate', code: '#C3BFC1'},
      {name: 'picton blue', code: '#5CB9E6'},
      {name: 'deep blush', code: '#E65BB7'}
    ];
    this.selectedBold = false;
    this.selectedItalic = false;
    this.selectedUnderline = false;
  }

  ngOnInit() {
    this.selectedAlignValue = this.textAlignValues[0];
    this.selectedBackgroundColor = 'yellow';
    this.selectedTextColor = 'black';
    this.theNote = {
      text: '',
      backgroundColor: this.selectedBackgroundColor,
      color: this.selectedTextColor
    }
  }

  ngOnChanges(changes: SimpleChange) {
    if (typeof changes == "object" && changes.hasOwnProperty("selectedNote")) {
      if (this.selectedNote && this.selectedNote.hasOwnProperty('color') && this.selectedNote.hasOwnProperty('id') && this.selectedNote.hasOwnProperty('text')) {
        this.startEditingNote();
      }
    }
  }

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  createNote(text: string): void {
    text = text.trim();
    if (text === '') {
      return;
    }
    this.theNote['text'] = text;
    this.theNote['backgroundColor'] = this.selectedBackgroundColor;
    this.theNote['color'] = this.selectedTextColor;
    this.createNoteHandler.emit(this.theNote);

    this.resetEditorConfig();
  }

  underlineHandler(): void {
    this.document.execCommand("underline", false, null);
    this.selectedUnderline = !this.selectedUnderline;
  }

  strikeThroughHandler(): void {
    this.document.execCommand("strikeThrough", false, null);
    this.selectedStrikeThrough = !this.selectedStrikeThrough;
  }

  insertOrderedListHandler(): void {
    this.document.execCommand("insertOrderedList", false, null);
    this.selectedOrderedList = !this.selectedOrderedList;
  }

  insertUnorderedListHandler(): void {
    this.document.execCommand("insertUnorderedList", false, null);
    this.selectedUnorderedList = !this.selectedUnorderedList;
  }

  boldHandler(): void {
    this.document.execCommand("bold", false, null);
    this.selectedBold = !this.selectedBold;
  }

  italicHandler(): void {
    this.document.execCommand("italic", false, null);
    this.selectedItalic = !this.selectedItalic;
  }

  fontSizeHandler(size: number): void {
    this.document.execCommand("fontSize", false, size);
  }

  fontNameHandler(fontName: string): void {
    this.document.execCommand("fontName", false, fontName);
  }

  fontColorHandler(fontColor: string): void {
    this.document.execCommand("foreColor", false, fontColor);
    this.selectedTextColor = fontColor;
  }

  backgroundColorHandler(backColor: string): void {
    this.document.execCommand("backColor", false, backColor);
    this.selectedBackgroundColor = backColor;
  }

  alignTextHandler(alignValue: string): void {
    let command: string;

    switch(alignValue) {
      case 'left':
        command = 'justifyLeft';
        break;
      case 'right':
        command = 'justifyRight';
        break;
      case 'center':
        command = 'justifyCenter';
        break;
      case 'justify':
        command = 'justifyFull';
        break;
      default:
        command = 'justifyLeft';
        break;
    }

    setTimeout(() => {
      this.selectedAlignValue = alignValue;
    }, 0);


    this.document.execCommand(command, false, null);
  }

  undoHandler(): void {
    this.document.execCommand("undo");
  }

  resetEditorConfig(): void {
    this.el.nativeElement.innerHTML = '';
    this.selectedBold = false;
    this.selectedItalic = false;
    this.selectedUnderline = false;
    this.selectedAlignValue = this.textAlignValues[0];
    this.selectedStrikeThrough = false;
  }

  startEditingNote(): void {
    this.editingMode = true;
    this.el.nativeElement.innerHTML = this.selectedNote.text;
    this.selectedBackgroundColor = this.selectedNote.color;
  }

  cancelUpdateNote(): void {
    this.resetEditorConfig();
    this.editingMode = false;
    this.selectedNote = {};
    this.updateNoteHandler.emit();
  }

  updateNote(text: string): void {
    text = text.trim();
    if (text === '') {
      return;
    }

    this.selectedNote["text"] = text;
    this.selectedNote["color"] = this.selectedBackgroundColor;
    this.updateNoteHandler.emit();

    this.resetEditorConfig();
    this.editingMode = false;
  }

}
