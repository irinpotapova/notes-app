import { NotesAppCliPage } from './app.po';

describe('notes-app-cli App', () => {
  let page: NotesAppCliPage;

  beforeEach(() => {
    page = new NotesAppCliPage();
    page.navigateTo();
  });

  it('should display h1 saying "Notes App"', () => {
    expect(page.getH1Text()).toEqual('Notes App');
  });

  it('should display h2 saying "Here\'s a place where you can add/edit your notes."', () => {
    expect(page.getH2Text()).toEqual("Here's a place where you can add/edit your notes.");
  });
});
