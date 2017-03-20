import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild, SimpleChange } from '@angular/core';

@Component({
  selector: 'notes-editor',
  templateUrl: './notes-editor.component.html',
  styleUrls: ['./notes-editor.component.css']
})
export class NotesEditorComponent implements OnInit {

  @Input() fontSize: string = '20';
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

  fontSizes: string[];
  fontNames: string[];
  textAlignValues: string[];
  selectedAlignValue: string;
  private color: string = '#d7d7d7';
  private bckgColor: string = '#21201f';

  constructor() {
    this.fontSizes = [
      '8', '10', '12', '14', '16', '18', '20', '24', '30', '32', '36', '48', '64', '72'
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

  underlineHandler():void {
    // none
    // underline
    if (this.underlinedText === undefined) {
      this.underlinedText = 'none';
    }
    this.underlinedText = this.underlinedText === 'none' ? 'underline' : 'none';
    this.underlinedTextChanged.emit(this.underlinedText);
  }
  boldHandler():void {
    // normal
    // bold
    if (this.boldText === undefined) {
      this.boldText = 'normal';
    }
    this.boldText = this.boldText === 'normal' ? 'bold' : 'normal';
    this.boldTextChanged.emit(this.boldText);
  }
  italicHandler():void {
    // normal
    // italic
    if (this.uppercaseText === undefined) {
      this.uppercaseText = 'none';
    }
    this.uppercaseText = this.uppercaseText === 'none' ? 'uppercase' : 'none';
    this.uppercaseTextChanged.emit(this.uppercaseText);
  }
  setFontSize(size: string):void {
    this.fontSize = size;
    this.fontSizeChanged.emit(size);
  }
  setFontName(fontName: string):void {
    this.fontFamily = fontName;
    this.fontFamilyChanged.emit(fontName);
  }
  setFontColor(fontColor: string):void {
    this.textColor = fontColor;
    this.textColorChanged.emit(fontColor);
  }
  setBackgroundColor(backColor: string):void {
    this.backgroundColor = backColor;
    this.backgroundColorChanged.emit(backColor);
  }
  alignText(alignValue: string):void {
    this.selectedAlignValue = alignValue;
    this.textAlign = alignValue;
    this.textAlignChanged.emit(alignValue);
  }

}
