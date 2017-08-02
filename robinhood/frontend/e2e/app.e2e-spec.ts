import { TestprojectPage } from './app.po';

describe('testproject App', () => {
  let page: TestprojectPage;

  beforeEach(() => {
    page = new TestprojectPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
