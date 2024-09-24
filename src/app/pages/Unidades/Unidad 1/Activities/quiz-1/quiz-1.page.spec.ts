import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Quiz1Page } from './quiz-1.page';

describe('Quiz1Page', () => {
  let component: Quiz1Page;
  let fixture: ComponentFixture<Quiz1Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Quiz1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
