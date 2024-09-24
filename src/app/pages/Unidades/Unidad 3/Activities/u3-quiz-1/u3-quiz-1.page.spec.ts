import { ComponentFixture, TestBed } from '@angular/core/testing';
import { U3Quiz1Page } from './u3-quiz-1.page';

describe('U3Quiz1Page', () => {
  let component: U3Quiz1Page;
  let fixture: ComponentFixture<U3Quiz1Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(U3Quiz1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
