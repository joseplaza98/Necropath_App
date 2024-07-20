import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth/auth.service';
import { FirestoreService } from '../../services/firestore.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-test-1',
  templateUrl: './test-1.page.html',
  styleUrls: ['./test-1.page.scss'],
})
export class Test1Page implements OnInit {
  questions: any[] = [];
  selectedAnswers: { [index: number]: string } = {};

  @ViewChildren('questionItem') questionItems!: QueryList<ElementRef>;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private firestoreService: FirestoreService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.loadQuestions();
  }

  loadQuestions() {
    this.http.get<any[]>('/assets/questions.json').subscribe(
      data => {
        this.questions = data.filter(q => q.testNumber === 1)[0]?.questions || [];
        console.log('Questions loaded:', this.questions);

        // Apply animation to questions
        this.animateQuestions();
      },
      error => {
        console.error('Error loading questions:', error);
      }
    );
  }

  animateQuestions() {
    this.questionItems.forEach((item, index) => {
      // Add animation class after a delay
      setTimeout(() => {
        item.nativeElement.classList.add('animate__animated', 'animate__fadeIn');
      }, index * 300); // Delay for each item
    });
  }

  async submit() {
    let correctAnswers = 0;
    const totalQuestions = this.questions.length;

    for (let i = 0; i < totalQuestions; i++) {
      const question = this.questions[i];
      const correctAnswer = question.answers.find((a: { isCorrect: boolean }) => a.isCorrect)?.text;
      const selectedAnswer = this.selectedAnswers[i];

      if (selectedAnswer && correctAnswer && selectedAnswer.trim() === correctAnswer.trim()) {
        correctAnswers++;
      }
    }

    const alert = await this.alertController.create({
      header: 'Test Completed',
      message: `Has acertado ${correctAnswers} de ${totalQuestions} preguntas.`,
      buttons: ['OK']
    });
    await alert.present();

    const userId = await this.authService.getCurrentUserId();
    if (userId) {
      await this.firestoreService.saveUserScore(userId, 1, correctAnswers, totalQuestions);
    }
  }
}
