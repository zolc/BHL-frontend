import { BhlPage } from './app.po';

describe('bhl App', () => {
  let page: BhlPage;

  beforeEach(() => {
    page = new BhlPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
