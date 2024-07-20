import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { AuthService } from '../services/auth/auth.service';
import { Chart, registerables } from 'chart.js';
import { switchMap, of } from 'rxjs';  // Importa 'of' desde 'rxjs'

// Registrar todos los componentes necesarios de Chart.js
Chart.register(...registerables);

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit, AfterViewInit {
  userId: string = '';
  userName: string = ''; // Nueva propiedad para el nombre del usuario
  chart: any;
  score: number = 0; // Asegúrate de que estas propiedades existan y se actualicen correctamente
  totalQuestions: number = 0;

  constructor(
    private firestoreService: FirestoreService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.getUserProfile().subscribe(profile => {
      if (profile) {
        this.userName = profile.name || 'User'; // Ajusta según el campo en tu Firestore
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
        if (scores) {
          const testNumbers = Object.keys(scores).map((key) => parseInt(key.replace('Test ', ''), 10));
          const correctAnswers = testNumbers.map((testNumber) => scores[`Test ${testNumber}`]?.correctAnswers || 0);
          const totalQuestions = testNumbers.map((testNumber) => scores[`Test ${testNumber}`]?.totalQuestions || 0);

          this.renderChart(correctAnswers, totalQuestions);
          
          // Asegúrate de que estas propiedades existan y se actualicen correctamente
          this.totalQuestions = totalQuestions.reduce((sum, val) => sum + val, 0);
          this.score = correctAnswers.reduce((sum, val) => sum + val, 0);
        }
      });
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
          labels: correctAnswers.map((_, index) => `Test ${index + 1}`),
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
}
