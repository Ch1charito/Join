import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditContactOverlayComponent } from './edit-contact-overlay.component';

describe('EditContactOverlayComponent', () => {
  let component: EditContactOverlayComponent;
  let fixture: ComponentFixture<EditContactOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditContactOverlayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditContactOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
