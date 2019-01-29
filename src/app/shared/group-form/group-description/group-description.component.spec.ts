import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupDescriptionComponent } from './group-description.component';

describe('GroupDescriptionComponent', () => {
  let component: GroupDescriptionComponent;
  let fixture: ComponentFixture<GroupDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupDescriptionComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
