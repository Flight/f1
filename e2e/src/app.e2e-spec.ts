import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display the seasons title', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Formula 1 Seasons');
  });
});
