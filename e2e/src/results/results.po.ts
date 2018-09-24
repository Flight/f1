import { ExpectedConditions, browser, by, element } from 'protractor';

export class ResultsPage {
  navigateTo() {
    return browser.get('/results/2005');
  }

  getHeaderText() {
    return element(by.css('app-root h1')).getText();
  }

  getBackLinks() {
    return element.all(by.css('app-root .back'));
  }

  getTableRows() {
    const tableVisible = ExpectedConditions.visibilityOf(element(by.css('app-root table tr')));

    browser.wait(tableVisible, 5000, 'Timed out waiting for results table');
    return element.all(by.css('app-root table tr'));
  }

  clickBackLink() {
    return element(by.css('app-root .back')).click();
  }

  getPageUrl() {
    return browser.getCurrentUrl();
  }

  getPageTitle() {
    return browser.getTitle();
  }
}
