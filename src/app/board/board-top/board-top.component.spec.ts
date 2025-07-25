import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardTopComponent } from './board-top.component';

describe('BoardTopComponent', () => {
  let component: BoardTopComponent;
  let fixture: ComponentFixture<BoardTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardTopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
