import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NgbDatePickerComponent} from './ngb-date-picker.component';

describe('NgbDatePickerComponent', () => {
  let component: NgbDatePickerComponent;
  let fixture: ComponentFixture<NgbDatePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NgbDatePickerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgbDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
