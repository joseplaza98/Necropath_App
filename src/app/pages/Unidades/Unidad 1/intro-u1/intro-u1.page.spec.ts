import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IntroU1Page } from './intro-u1.page';

describe('IntroU1Page', () => {
  let component: IntroU1Page;
  let fixture: ComponentFixture<IntroU1Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroU1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
