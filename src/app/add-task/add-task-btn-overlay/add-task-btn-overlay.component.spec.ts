import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskBtnOverlayComponent } from './add-task-btn-overlay.component';

describe('AddTaskBtnOverlayComponent', () => {
  let component: AddTaskBtnOverlayComponent;
  let fixture: ComponentFixture<AddTaskBtnOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTaskBtnOverlayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTaskBtnOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
