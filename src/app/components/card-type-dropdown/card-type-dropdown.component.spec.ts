import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTypeDropdownComponent } from './card-type-dropdown.component';

describe('CardTypeDropdownComponent', () => {
  let component: CardTypeDropdownComponent;
  let fixture: ComponentFixture<CardTypeDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardTypeDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardTypeDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
