import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild, SimpleChange, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

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
  private color: string = '#d7d7d7';
  private bckgColor: string = '#21201f';

  constructor(@Inject(DOCUMENT) private document: any) {
    this.fontSizes = [ 1, 2, 3, 4, 5, 6, 7 ];
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
  }

  ngOnInit() {
    this.selectedAlignValue = this.textAlignValues[2];
  }

  ngOnChanges(changes: SimpleChange) {

  }

  createNote(text: string): void {
    if (text === '') {
      return;
    }
    this.createNoteHandler.emit(text);
    this.el.nativeElement.value = '';
  }

  passUnderline():void {
    // none
    // underline
    if (this.underlinedText === undefined) {
      this.underlinedText = 'none';
    }
    this.underlinedText = this.underlinedText === 'none' ? 'underline' : 'none';
    this.underlinedTextChanged.emit(this.underlinedText);
  }
  passBold():void {
    // normal
    // bold
    if (this.boldText === undefined) {
      this.boldText = 'normal';
    }
    this.boldText = this.boldText === 'normal' ? 'bold' : 'normal';
    this.boldTextChanged.emit(this.boldText);
  }
  passItalic():void {
    // normal
    // italic
    if (this.uppercaseText === undefined) {
      this.uppercaseText = 'none';
    }
    this.uppercaseText = this.uppercaseText === 'none' ? 'uppercase' : 'none';
    this.uppercaseTextChanged.emit(this.uppercaseText);
  }
  passFontSize(size: number):void {
    this.fontSize = size;
    this.fontSizeChanged.emit(size);
  }
  passFontName(fontName: string):void {
    this.fontFamily = fontName;
    this.fontFamilyChanged.emit(fontName);
  }
  passFontColor(fontColor: string):void {
    this.textColor = fontColor;
    this.textColorChanged.emit(fontColor);
  }
  passBackgroundColor(backColor: string):void {
    this.backgroundColor = backColor;
    this.backgroundColorChanged.emit(backColor);
  }
  passAlignText(alignValue: string):void {
    this.selectedAlignValue = alignValue;
    this.textAlign = alignValue;
    this.textAlignChanged.emit(alignValue);
  }
  underlineHandler():void {
    this.document.execCommand("underline", false, null);
  }
  boldHandler():void {
    this.document.execCommand("bold", false, null);
  }
  italicHandler():void {
    this.document.execCommand("italic", false, null);
  }
  fontSizeHandler(size: number):void {
    this.document.execCommand("fontSize", false, size);
  }
  fontNameHandler(fontName: string):void {
    this.document.execCommand("fontName", false, fontName);
  }
  fontColorHandler(fontColor: string):void {
    this.document.execCommand("foreColor", false, fontColor);
  }
  backgroundColorHandler(backColor: string):void {
    this.document.execCommand("backColor", false, backColor);
  }
  alignTextHandler(alignValue: string):void {
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

    this.document.execCommand(command, false, null);
  }
}
