import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../../../services/auth/auth.service';
import { FirestoreService } from '../../../../../services/firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-1',
  templateUrl: './quiz-1.page.html',
  styleUrls: ['./quiz-1.page.scss'],
})
export class Quiz1Page implements OnInit {
  questions: any[] = []; // Aquí se almacenarán las preguntas cargadas
  selectedAnswer: string = ''; // Respuesta seleccionada por el usuario
  feedback: string = ''; // Retroalimentación para la respuesta seleccionada
  correctAnswers: number = 0;
  quizCompleted: boolean = false;
  totalQuestions: number = 0;
  currentQuestionIndex: number = 0; // Índice de la pregunta actual

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private firestoreService: FirestoreService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadQuestions();
  }

  loadQuestions() {
    this.http.get<any[]>('/assets/quiz-questions.json').subscribe(
      data => {
        console.log('Data loaded:', data); // Verifica la estructura de los datos
        if (Array.isArray(data)) {
          const quizData = data.find(q => q.testNumber === 1);
          if (quizData) {
            this.questions = quizData.questions || [];
            this.totalQuestions = this.questions.length;
            console.log('Questions:', this.questions);
          } else {
            console.error('No data found for testNumber 1');
          }
        } else {
          console.error('Loaded data is not an array:', data);
        }
      },
      error => {
        console.error('Error loading questions:', error);
      }
    );
  }
  

  submitAnswer() {
    if (this.currentQuestionIndex < this.totalQuestions) {
      const question = this.questions[this.currentQuestionIndex];
      const correctAnswer = question.answers.find((a: { isCorrect: boolean }) => a.isCorrect)?.text;
      
      if (this.selectedAnswer.trim() === correctAnswer?.trim()) {
        this.correctAnswers++;
        this.feedback = question.feedback.correct;
      } else {
        this.feedback = question.feedback.incorrect;
      }

      setTimeout(() => {
        this.feedback = '';
        this.currentQuestionIndex++;
        this.selectedAnswer = '';

        if (this.currentQuestionIndex >= this.totalQuestions) {
          this.quizCompleted = true;
          this.saveResults();
        }
      }, 2000); // Espera 2 segundos para mostrar el feedback antes de pasar a la siguiente pregunta
    }
  }

  async saveResults() {
    const userId = await this.authService.getCurrentUserId();
    if (userId) {
      await this.firestoreService.saveUserScore(userId, "Quiz 1", this.correctAnswers, this.totalQuestions); // Cambia el número del test si es necesario
    }
  }

  retryQuiz() {
    this.quizCompleted = false;
    this.selectedAnswer = '';
    this.currentQuestionIndex = 0;
    this.correctAnswers = 0;
    this.feedback = '';
  }

  goU1() {
    this.router.navigate(['/u1-tema-1']);
  }
}
