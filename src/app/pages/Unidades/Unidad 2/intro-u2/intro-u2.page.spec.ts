import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IntroU2Page } from './intro-u2.page';

describe('IntroU2Page', () => {
  let component: IntroU2Page;
  let fixture: ComponentFixture<IntroU2Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroU2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
