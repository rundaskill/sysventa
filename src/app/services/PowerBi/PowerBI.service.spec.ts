/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PowerBIService } from './PowerBI.service';

describe('Service: PowerBI', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PowerBIService]
    });
  });

  it('should ...', inject([PowerBIService], (service: PowerBIService) => {
    expect(service).toBeTruthy();
  }));
});
