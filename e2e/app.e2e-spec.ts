import { MyTableAngularPage } from './app.po';

describe('my-table-angular App', () => {
  let page: MyTableAngularPage;

  beforeEach(() => {
    page = new MyTableAngularPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
