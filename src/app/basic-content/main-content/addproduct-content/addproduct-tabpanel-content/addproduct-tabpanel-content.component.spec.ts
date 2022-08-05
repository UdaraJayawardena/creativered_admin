import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddproductTabpanelContentComponent} from './addproduct-tabpanel-content.component';

describe('AddproductTabpanelContentComponent', () => {
  let component: AddproductTabpanelContentComponent;
  let fixture: ComponentFixture<AddproductTabpanelContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddproductTabpanelContentComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddproductTabpanelContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
