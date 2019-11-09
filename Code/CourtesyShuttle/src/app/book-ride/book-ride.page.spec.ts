import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookRidePage } from './book-ride.page';

describe('BookRidePage', () => {
  let component: BookRidePage;
  let fixture: ComponentFixture<BookRidePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookRidePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookRidePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
