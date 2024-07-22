import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IntroU3Page } from './intro-u3.page';

describe('IntroU3Page', () => {
  let component: IntroU3Page;
  let fixture: ComponentFixture<IntroU3Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroU3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
