import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth/auth.service';
import { FirestoreService } from '../../services/firestore.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-test-1',
  templateUrl: './test-1.page.html',
  styleUrls: ['./test-1.page.scss'],
})
export class Test1Page implements OnInit {
  questions: any[] = [];
  selectedAnswers: { [index: number]: string } = {};
  correctAnswers: number = 0;
  testCompleted: boolean = false;
  testForm!: FormGroup;
  totalQuestions: number = 0;

  @ViewChildren('questionItem') questionItems!: QueryList<ElementRef>;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private firestoreService: FirestoreService,
    private alertController: AlertController,
    private toastController: ToastController,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.loadQuestions();
    this.testForm = this.formBuilder.group({});
  }

  loadQuestions() {
    this.http.get<any[]>('/assets/questions.json').subscribe(
      data => {
        this.questions = data.filter(q => q.testNumber === 1)[0]?.questions || [];
        this.totalQuestions = this.questions.length;
        this.questions.forEach((question, index) => {
          this.testForm.addControl(index.toString(), new FormControl(''));
        });
        console.log('Questions loaded:', this.questions);
        this.animateQuestions();
      },
      error => {
        console.error('Error loading questions:', error);
      }
    );
  }

  animateQuestions() {
    this.questionItems.forEach((item, index) => {
      setTimeout(() => {
        item.nativeElement.classList.add('animate__animated', 'animate__fadeIn');
      }, index * 300);
    });
  }

  async submit() {
    this.correctAnswers = 0;
    const totalQuestions = this.questions.length;

    for (let i = 0; i < totalQuestions; i++) {
      const question = this.questions[i];
      const correctAnswer = question.answers.find((a: { isCorrect: boolean }) => a.isCorrect)?.text;
      const selectedAnswer = this.testForm.value[i.toString()];

      if (selectedAnswer && correctAnswer && selectedAnswer.trim() === correctAnswer.trim()) {
        this.correctAnswers++;
      }
    }

    this.testCompleted = true;

    const userId = await this.authService.getCurrentUserId();
    if (userId) {
      await this.firestoreService.saveUserScore(userId, 1, this.correctAnswers, totalQuestions);
    }
  }

  retryTest() {
    this.testCompleted = false;
    this.selectedAnswers = {};
    this.testForm.reset();
  }

  goHome() {
    this.router.navigate(['/home']);
  }

}
