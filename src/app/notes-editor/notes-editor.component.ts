import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild, SimpleChange, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

interface Note {
  text: string;
  backgroundColor: string
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

  @Output() fontSizeChanged = new EventEmitter();
  @Output() fontFamilyChanged = new EventEmitter();
  @Output() textAlignChanged = new EventEmitter();
  @Output() textColorChanged = new EventEmitter();
  @Output() backgroundColorChanged = new EventEmitter();
  @Output() boldTextChanged = new EventEmitter();
  @Output() uppercaseTextChanged = new EventEmitter();
  @Output() underlinedTextChanged = new EventEmitter();
  @Output() createNoteHandler = new EventEmitter();
  @ViewChild('textarea') el: ElementRef;

  fontSizes: number[];
  fontNames: string[];
  textAlignValues: string[];
  selectedAlignValue: string;
  backgroundColors: Object[];
  selectedBackgroundColor: string;
  selectedBold: boolean;
  selectedItalic: boolean;
  selectedUnderline: boolean;
  theNote: Note;
  private color: string = '#d7d7d7';
  private bckgColor: string = '#21201f';

  public status: {isopen: boolean} = { isopen: false };

  constructor(@Inject(DOCUMENT) private document: any) {
    this.fontSizes = [
      1, 2, 3, 4, 5, 6, 7
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
      {name: 'spring green', code: '#00fa9a'},
    ];
    this.selectedBold = false;
    this.selectedItalic = false;
    this.selectedUnderline = false;
  }

  ngOnInit() {
    this.selectedAlignValue = this.textAlignValues[0];
    this.selectedBackgroundColor = 'yellow';
    this.theNote = {
      text: '',
      backgroundColor: this.selectedBackgroundColor
    }
  }

  ngOnChanges(changes: SimpleChange) {

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
    this.createNoteHandler.emit(this.theNote);

    this.el.nativeElement.innerHTML = '';
    this.selectedBold = false;
    this.selectedItalic = false;
    this.selectedUnderline = false;
    this.selectedAlignValue = this.textAlignValues[0];
  }
  underlineHandler(): void {
    this.document.execCommand("underline", false, null);
    this.selectedUnderline = !this.selectedUnderline;
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
}
