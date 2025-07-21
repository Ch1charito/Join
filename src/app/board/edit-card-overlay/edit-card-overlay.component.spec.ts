import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCardOverlayComponent } from './edit-card-overlay.component';

describe('EditCardOverlayComponent', () => {
  let component: EditCardOverlayComponent;
  let fixture: ComponentFixture<EditCardOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCardOverlayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCardOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
