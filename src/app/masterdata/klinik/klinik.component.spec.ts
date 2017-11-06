import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KlinikComponent } from './klinik.component';

describe('KlinikComponent', () => {
  let component: KlinikComponent;
  let fixture: ComponentFixture<KlinikComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KlinikComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KlinikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
