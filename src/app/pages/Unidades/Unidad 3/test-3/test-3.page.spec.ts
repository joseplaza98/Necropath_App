import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Test3Page } from './test-3.page';

describe('Test3Page', () => {
  let component: Test3Page;
  let fixture: ComponentFixture<Test3Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Test3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
