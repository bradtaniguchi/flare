import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayFieldLabelComponent } from './display-field-label.component';

describe('DisplayFieldLabelComponent', () => {
  let component: DisplayFieldLabelComponent;
  let fixture: ComponentFixture<DisplayFieldLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayFieldLabelComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayFieldLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
