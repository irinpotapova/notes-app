import { browser, element, by } from 'protractor';

export class NotesAppCliPage {
  navigateTo() {
    return browser.get('/');
  }

  getH1Text() {
    return element(by.css('notes-app h1')).getText();
  }

  getH2Text() {
    return element(by.css('notes-app h2')).getText();
  }
}
