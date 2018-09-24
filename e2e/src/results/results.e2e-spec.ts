import { ResultsPage } from './results.po';

describe('workspace-project Results', () => {
  let page: ResultsPage;

  beforeEach(() => {
    page = new ResultsPage();
  });

  it('should display the seasons title', () => {
    page.navigateTo();
    expect(page.getHeaderText()).toEqual('Formula 1 results for season 2005');
  });

  it('should have the title with the year', () => {
    expect(page.getPageTitle()).toEqual('2005 Formula 1 Results');
  });

  it('should have two back links', () => {
    expect(page.getBackLinks().count()).toEqual(2);
  });

  it('should render the table with minimum 2 rows', () => {
    expect(page.getTableRows().count()).toBeGreaterThan(1);
  });

  it('should navigate to results page on season clicked', () => {
    page.clickBackLink();
    expect(page.getPageUrl()).toContain('/seasons');
  });
});
