import { TestBed, inject } from '@angular/core/testing';

import { ClinicService } from './Clinic.service';

describe('ClinicService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClinicService]
    });
  });

  it('should be created', inject([ClinicService], (service: ClinicService) => {
    expect(service).toBeTruthy();
  }));
});
