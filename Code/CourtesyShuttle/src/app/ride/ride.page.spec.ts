import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RidePage } from './ride.page';

describe('RidePage', () => {
  let component: RidePage;
  let fixture: ComponentFixture<RidePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RidePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RidePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
