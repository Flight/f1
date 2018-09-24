import { SeasonsPage } from './seasons.po';

describe('workspace-project Seasons', () => {
  let page: SeasonsPage;

  beforeEach(() => {
    page = new SeasonsPage();
  });

  it('should display the seasons title', () => {
    page.navigateTo();
    expect(page.getHeaderText()).toEqual('Formula 1 Seasons');
  });

  it('should have the title', () => {
    expect(page.getPageTitle()).toEqual('Formula 1 Results');
  });

  it('should render all the 11 seasons', () => {
    expect(page.getLinks().count()).toEqual(11);
  });

  it('should navigate to results page on season clicked', () => {
    page.clickSeasonButton();
    expect(page.getPageUrl()).toContain('/results/2005');
  });
});
