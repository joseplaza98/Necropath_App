import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../../../services/auth/auth.service';
import { FirestoreService } from '../../../../../services/firestore.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-test-3',
  templateUrl: './test-3.page.html',
  styleUrls: ['./test-3.page.scss'],
})
export class Test3Page implements OnInit {

  questions: any[] = []; // Aquí se almacenarán las preguntas cargadas
  selectedAnswers: { [index: number]: string } = {}; // Almacena las respuestas seleccionadas por el usuario
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
    this.http.get<any[]>('/assets/questions.json').subscribe( //Ruta donde se almacena el json del test
      data => {
        console.log('Datos recibidos de questions.json:', data);
        this.questions = data.filter(q => q.testNumber === 3)[0]?.questions || [];
        this.totalQuestions = this.questions.length;
        this.questions.forEach((question, index) => {
          this.testForm.addControl(index.toString(), new FormControl(''));
        });
        console.log('Preguntas cargadas:', this.questions);
        this.animateQuestions();
      },
      error => {
        console.error('Error al cargar las preguntas:', error);
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

  onAnswerChange(event: any, index: number) {
    const selectedValue = event.detail.value;
    console.log(`Respuesta seleccionada por pregunta ${index + 1}:`, selectedValue);
    this.selectedAnswers[index] = selectedValue;
  }

  async submit() {
    this.correctAnswers = 0;
    const totalQuestions = this.questions.length;

    console.log('Total de preguntas:', totalQuestions);

    for (let i = 0; i < totalQuestions; i++) {
      const question = this.questions[i];
      const correctAnswer = question.answers.find((a: { isCorrect: boolean }) => a.isCorrect)?.text;
      const selectedAnswer = this.selectedAnswers[i];

   /**Logs para validar preguntas y respuestas
      console.log(`Pregunta ${i + 1}:`);
      console.log('Repsuesta correcta:', correctAnswer);
      console.log('Respuesta seleccionada:', selectedAnswer);
      */

      if (selectedAnswer && correctAnswer && selectedAnswer.trim() === correctAnswer.trim()) {
        this.correctAnswers++;
      }
    }

    console.log('Respuestas correctas:', this.correctAnswers);
    this.testCompleted = true;

    const userId = await this.authService.getCurrentUserId();
    if (userId) {
      console.log('Guardando puntaje del usuario...');
      await this.firestoreService.saveUserScore(userId, "u3_test", this.correctAnswers, totalQuestions);
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