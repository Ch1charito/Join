import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyPolicyGuestComponent } from './privacy-policy-guest.component';

describe('PrivacyPolicyGuestComponent', () => {
  let component: PrivacyPolicyGuestComponent;
  let fixture: ComponentFixture<PrivacyPolicyGuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivacyPolicyGuestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivacyPolicyGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
