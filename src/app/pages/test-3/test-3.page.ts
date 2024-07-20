import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth/auth.service';
import { FirestoreService } from '../../services/firestore.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-test-3',
  templateUrl: './test-3.page.html',
  styleUrls: ['./test-3.page.scss'],
})
export class Test3Page implements OnInit {

  questions: any[] = [];
  selectedAnswers: { [index: number]: string } = {};

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
        // Filtrar solo las preguntas para el test 3
        this.questions = data.filter(q => q.testNumber === 3)[0]?.questions || [];
        console.log('Questions loaded:', this.questions); // Depuración: Verificar datos de preguntas
      },
      error => {
        console.error('Error loading questions:', error);
      }
    );
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

    // Mostrar el puntaje en una notificación
    const alert = await this.alertController.create({
      header: 'Test Completed',
      message: `Has acertado ${correctAnswers} de ${totalQuestions} preguntas.`,
      buttons: ['OK']
    });
    await alert.present();

    // Obtener el ID del usuario actual y guardar el puntaje en Firestore
    const userId = await this.authService.getCurrentUserId();
    if (userId) {
      await this.firestoreService.saveUserScore(userId, 3, correctAnswers, totalQuestions);
    }
  }
}