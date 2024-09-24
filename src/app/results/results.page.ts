import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { AuthService } from '../services/auth/auth.service';
import { Chart, registerables } from 'chart.js';

// Registrar todos los componentes necesarios de Chart.js
Chart.register(...registerables);

interface UserScore {
  correctAnswers: number;
  totalQuestions: number;
}

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit, AfterViewInit {
  userId: string = '';
  userName: string = '';
  chart: any;
  score: number = 0;
  totalQuestions: number = 0;
  results: any[] = [];
  unitScores: { [key: string]: number } = {}; // Para almacenar los puntajes por unidad

  constructor(
    private firestoreService: FirestoreService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.getUserProfile().subscribe(profile => {
      if (profile) {
        this.userName = profile.name || 'User';
        this.userId = profile.uid;
        this.fetchScores();
      }
    });
  }

  ngAfterViewInit() {
    this.renderChart([], []);
  }

  fetchScores() {
    if (this.userId) {
      this.firestoreService.getUserScores(this.userId).subscribe((scores) => {
        console.log('Scores:', scores); // Registro para verificar los datos de puntajes

        if (scores) {
          const scoreEntries = Object.entries(scores) as [string, UserScore][];

          // Organizar resultados según el orden requerido
          const orderedResults = [
            { key: 'reg-u1_quiz 1', name: 'Unidad 1: reg-u1-quiz 1' }, //Unidad 1: reg-u1-quiz 1
            { key: 'reg-u1_quiz 2', name: 'Unidad 1: reg-u1-quiz 2' }, //Unidad 1: reg-u1-quiz 2
            { key: 'reg-u1_test', name: 'Unidad 1: reg-u1-test' }, //Unidad 1: reg-u1-test
            { key: 'reg-u2_quiz 1', name: 'Unidad 2: reg-u2-quiz 1' }, //Unidad 2: reg-u2-quiz 1
            { key: 'reg-u2_test', name: 'Unidad 2: reg-u2-test' }, //Unidad 2: reg-u2-test
            { key: 'reg-u3_quiz 1', name: 'Unidad 3: reg-u3-quiz 1' }, //Unidad 3: reg-u3-quiz 1
            { key: 'reg-u3_test', name: 'Unidad 3: reg-u3-test' }, //Unidad 3: reg-u3-test
          ];

          this.results = orderedResults.map(({ key, name }) => {
            const scoreData = scores[key] || { correctAnswers: 0, totalQuestions: 0 };
            console.log(`Data for ${key}:`, scoreData); // Registro para verificar datos individuales

            const correctAnswers = scoreData.correctAnswers || 0;
            const totalQuestions = scoreData.totalQuestions || 0;
            const scorePercentage = totalQuestions > 0 ? ((correctAnswers / totalQuestions) * 100).toFixed(2) : 0;

            return { name, correctAnswers, totalQuestions, score: scorePercentage };
          });

          console.log('Results:', this.results); // Registro para verificar resultados finales

          // Obtener datos para el gráfico
          const correctAnswers = this.results.map(result => result.correctAnswers);
          const totalQuestionsArray = this.results.map(result => result.totalQuestions);
          
          this.renderChart(correctAnswers, totalQuestionsArray);
          
          // Calcular total de preguntas y puntajes
          this.totalQuestions = totalQuestionsArray.reduce((sum, val) => sum + val, 0);
          this.score = correctAnswers.reduce((sum, val) => sum + val, 0);

          // Calcular puntajes por unidad
          this.calculateUnitScores();
        }
      });
    }
  }

  calculateUnitScores() {
    const unitTotals: { [key: string]: { correct: number; total: number } } = {};

    this.results.forEach(result => {
        const unit = result.name.split(':')[0].trim(); // Extrae el nombre de la unidad
        const correctAnswers = result.correctAnswers;
        const totalQuestions = result.totalQuestions;

        // Inicializa el objeto para la unidad si no existe
        if (!unitTotals[unit]) {
            unitTotals[unit] = { correct: 0, total: 0 };
        }

        // Suma los correctos y totales
        unitTotals[unit].correct += correctAnswers;
        unitTotals[unit].total += totalQuestions;
    });

    // Calcula el puntaje por unidad y lo asigna a unitScores
    this.unitScores = {};
    for (const unit in unitTotals) {
        const { correct, total } = unitTotals[unit];
        this.unitScores[unit] = total > 0 ? parseFloat(((correct / total) * 100).toFixed(2)) : 0; // Calcula el porcentaje y convierte a número
    }
}

  renderChart(correctAnswers: number[], totalQuestions: number[]) {
    const canvas = document.getElementById('myChart') as HTMLCanvasElement;

    if (!canvas) {
      console.error('Canvas not found');
      return;
    }

    const ctx = canvas.getContext('2d');

    if (ctx) {
      if (this.chart) {
        this.chart.destroy();
      }

      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.results.map(result => result.name),
          datasets: [
            {
              label: 'Correct Answers',
              data: correctAnswers,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
            {
              label: 'Total Questions',
              data: totalQuestions,
              backgroundColor: 'rgba(153, 102, 255, 0.2)',
              borderColor: 'rgba(153, 102, 255, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    } else {
      console.error('Could not get context for chart');
    }
  }

  isInUnit(resultName: string, unit: string): boolean {
    if (unit === 'Unidad 1') {
      return resultName.includes('reg-u1');
    } else if (unit === 'Unidad 2') {
      return resultName.includes('reg-u2');
    } else if (unit === 'Unidad 3') {
      return resultName.includes('reg-u3');
    }
    return false;
  }
}
