import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAngularStudyComponent } from './test-angular-study.component';

describe('TestAngularStudyComponent', () => {
  let component: TestAngularStudyComponent;
  let fixture: ComponentFixture<TestAngularStudyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestAngularStudyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestAngularStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
