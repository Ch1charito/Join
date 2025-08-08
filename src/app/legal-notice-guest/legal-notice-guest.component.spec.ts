import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalNoticeGuestComponent } from './legal-notice-guest.component';

describe('LegalNoticeGuestComponent', () => {
  let component: LegalNoticeGuestComponent;
  let fixture: ComponentFixture<LegalNoticeGuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LegalNoticeGuestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LegalNoticeGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
