import { AutoAppealPage } from './app.po';

describe('auto-appeal App', function() {
  let page: AutoAppealPage;

  beforeEach(() => {
    page = new AutoAppealPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
