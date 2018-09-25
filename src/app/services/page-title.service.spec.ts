import { TestBed, inject } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';

import { PageTitleService } from './page-title.service';

class MockedTitle {
  getTitle() {
    return 'sample title';
  }
  setTitle() { }
}

describe('PageTitleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PageTitleService,
        { provide: Title, useClass: MockedTitle }
      ]
    });
  });

  it('should be created', inject([PageTitleService], (service: PageTitleService) => {
    expect(service).toBeTruthy();
  }));

  it('should change the title if the year setted', inject([PageTitleService], (service: PageTitleService) => {
    const setTitleSpy = spyOn(MockedTitle.prototype, 'setTitle');

    service.setYear(2005);
    expect(setTitleSpy).toHaveBeenCalled();
    expect(setTitleSpy).toHaveBeenCalledWith('2005 sample title');
  }));

  it('should change the title back if set default method called', inject([PageTitleService], (service: PageTitleService) => {
    const setTitleSpy = spyOn(MockedTitle.prototype, 'setTitle');

    service.setDefaultTitle();
    expect(setTitleSpy).toHaveBeenCalled();
    expect(setTitleSpy).toHaveBeenCalledWith('sample title');
  }));
});
