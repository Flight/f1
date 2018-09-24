import { ExpectedConditions, browser, by, element } from 'protractor';

export class SeasonsPage {
  navigateTo() {
    return browser.get('/');
  }

  getHeaderText() {
    return element(by.css('app-root h1')).getText();
  }

  getLinks() {
    const linkVisible = ExpectedConditions.visibilityOf(element(by.css('app-root .link')));

    browser.wait(linkVisible, 5000, 'Timed out waiting for seasons urls');
    return element.all(by.css('app-root .link'));
  }

  clickSeasonButton() {
    const linkVisible = ExpectedConditions.visibilityOf(element(by.css('app-root .link')));

    browser.wait(linkVisible, 5000, 'Timed out waiting for seasons urls');
    return element(by.css('app-root .link')).click();
  }

  getPageUrl() {
    return browser.getCurrentUrl();
  }

  getPageTitle() {
    return browser.getTitle();
  }
}
