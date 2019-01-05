import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupListFieldComponent } from './group-list-field.component';

describe('GroupListFieldComponent', () => {
  let component: GroupListFieldComponent;
  let fixture: ComponentFixture<GroupListFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupListFieldComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupListFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
