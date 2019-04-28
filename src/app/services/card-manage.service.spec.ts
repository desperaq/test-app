import { TestBed } from '@angular/core/testing';

import { CardManageService } from './card-manage.service';

describe('CardManageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CardManageService = TestBed.get(CardManageService);
    expect(service).toBeTruthy();
  });
});
