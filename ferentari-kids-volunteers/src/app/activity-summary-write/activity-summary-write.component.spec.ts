import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitySummaryWriteComponent } from './activity-summary-write.component';

describe('ActivitySummaryWriteComponent', () => {
  let component: ActivitySummaryWriteComponent;
  let fixture: ComponentFixture<ActivitySummaryWriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivitySummaryWriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitySummaryWriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
