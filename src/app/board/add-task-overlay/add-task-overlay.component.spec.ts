import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskOverlayComponent } from './add-task-overlay.component';

describe('AddTaskOverlayComponent', () => {
  let component: AddTaskOverlayComponent;
  let fixture: ComponentFixture<AddTaskOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTaskOverlayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTaskOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
