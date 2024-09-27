import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-u3-tema-1',
  templateUrl: './u3-tema-1.page.html',
  styleUrls: ['./u3-tema-1.page.scss'],
})
export class U3Tema1Page implements OnInit {
  selectedContent: string | null = null;
  //Videos U1 SU1
  u3_su1_video1_Url: SafeResourceUrl;
  u3_su1_video2_Url: SafeResourceUrl;
  u3_su1_video3_Url: SafeResourceUrl;
  u3_su1_video4_Url: SafeResourceUrl;
  u3_su1_video5_Url: SafeResourceUrl;

  //Videos U1 SU2
  u3_su2_video1_Url: SafeResourceUrl;

  progress: any = {

    //Sub unidad 1
    u3_su1_intro: false,
    u3_su1_video1: false,
    u3_su1_video2: false,
    u3_su1_video3: false,
    u3_su1_video4: false,
    u3_su1_video5: false,
    u3_su1_quiz: false,
    
    //Sub unidad 2
    u3_su2_lectura1: false,
    u3_su2_video1: false,
    u3_su2_lectura2: false,
    u3_su2_lectura3: false,
    u3_su2_test_3: false,

  };

  constructor(
    private firestoreService: FirestoreService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {

    //Lista y enlaces de contenido de video
    this.u3_su1_video1_Url = this.sanitizer.bypassSecurityTrustResourceUrl('https://drive.google.com/file/d/1L3jAicUO2KA_D1m7VHt2lqHwvTCOT3JD/preview');
    this.u3_su1_video2_Url = this.sanitizer.bypassSecurityTrustResourceUrl('https://drive.google.com/file/d/1rqyR1k_ZJ7AzcWUS9p4elmIKR8fm28w6/preview');
    this.u3_su1_video3_Url = this.sanitizer.bypassSecurityTrustResourceUrl('https://drive.google.com/file/d/1poeFtcwXHLv5EzhAPaAtQUA06VA81bCt/preview');
    this.u3_su1_video4_Url = this.sanitizer.bypassSecurityTrustResourceUrl('https://drive.google.com/file/d/1grFmLlP0brDIq-RL8u9lsig0JPpQ4Sl_/preview');
    this.u3_su1_video5_Url = this.sanitizer.bypassSecurityTrustResourceUrl('https://drive.google.com/file/d/12C7m8YuqQPQ0Y2dG3HjaDM8RSGaOwPLi/preview');
    this.u3_su2_video1_Url = this.sanitizer.bypassSecurityTrustResourceUrl('https://drive.google.com/file/d/1XHw-RG5Bcmqd2RAtFYMXWRKkQXobgAXq/preview');

  }

  ngOnInit() {
    this.loadProgress();
    this.route.queryParams.subscribe(params => {
      const loadContent = params['loadContent'];
      if (loadContent) {
        this.loadContent(loadContent);
      } else {
        this.selectedContent = 'u3_su1_intro'; // Mostrar el primer contenido por defecto
      }
    });
  }

  async loadProgress() {
    try {
      const userId = await this.authService.getCurrentUserId();
      if (userId) {
        const userProgress = await this.firestoreService.getUserProgress(userId, 'unidad 3'); //Agrega la colección llamada Unidad 2 asociada con el uid del usuario registrado
        if (userProgress) {
          this.progress = userProgress;
          console.log('Progreso cargado desde Firebase:', this.progress); // Verifica si se carga correctamente
        }
        // Inicializa el progreso para el primer contenido
        if (!this.progress.u3_su1_intro) {
          this.progress.u3_su1_intro = true;
          this.saveProgress();
        }
        this.updateTestAccess();
      }
    } catch (error) {
      console.error('Error al cargar el progreso:', error);
    }
  }

  loadContent(contentType: string) {
    // Permitir acceso si el contenido anterior ha sido visto
    const contentOrder = ['u3_su1_intro', 'u3_su1_video1', 'u3_su1_video2', 'u3_su1_video3', 'u3_su1_video4', 'u3_su1_video5', 'u3_su1_quiz', 'u3_su2_lectura1', 'u3_su2_video1', 'u3_su2_lectura2', 'u3_su2_lectura3'];
    const currentIndex = contentOrder.indexOf(contentType);
    const previousContent = contentOrder[currentIndex - 1];

    if (contentType === 'u3_su1_intro' || (this.progress[previousContent] && this.progress[previousContent] !== undefined)) {
      this.selectedContent = contentType;
      if (!this.progress[contentType]) {
        this.progress[contentType] = true;
        this.saveProgress();
      }
    } else {
      console.warn('El contenido está bloqueado.');
    }
  }

  async saveProgress() {
    try {
      const userId = await this.authService.getCurrentUserId();
      if (userId) {
        console.log('Progress to save:', this.progress); // Log para verificar el progreso
        await this.firestoreService.saveUserProgress(userId, 'unidad 3', this.progress);
        console.log('Progreso guardado correctamente');
      }
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  }

  nextContent() {
    const contentOrder = ['u3_su1_intro', 'u3_su1_video1', 'u3_su1_video2', 'u3_su1_video3', 'u3_su1_video4', 'u3_su1_video5', 'u3_su1_quiz', 'u3_su2_lectura1', 'u3_su2_video1', 'u3_su2_lectura2', 'u3_su2_lectura3'];
    const currentIndex = contentOrder.indexOf(this.selectedContent!);
    const nextIndex = currentIndex + 1;

    if (nextIndex < contentOrder.length) {
      this.loadContent(contentOrder[nextIndex]);
    }
  }

  finishAndGoToTest() {
    this.progress.u3_su2_test_3 = true; // Marca el test como completado
    this.saveProgress().then(() => {
      this.router.navigate(['/test-3']);
    }).catch(error => {
      console.error('Error al finalizar el contenido:', error);
    });
  }

  async goToTest() {
    if (this.progress.u3_su1_intro && this.progress.u3_su1_video1 && this.progress.u3_su1_video2 && this.progress.u3_su1_video3 && this.progress.u3_su1_video4 && this.progress.u3_su1_video5 && this.progress.u3_su1_quiz && this.progress.u3_su2_lectura1 && this.progress.u3_su2_video1 && this.progress.u3_su2_lectura2 && this.progress.u3_su2_lectura3) {
      this.router.navigate(['/test-3']);
    } else {
      console.warn('Debe completar todos los contenidos antes de acceder al test.');
    }
  }

  // Navegar al quiz
  goToQuiz() {
    this.progress.u3_su1_quiz = true;
    console.log('Setting u3_su1_quiz to true'); // Marca el quiz como completado
    this.saveProgress().then(() => {
      console.log('Navigating to quiz-4');
      this.router.navigate(['/u3-quiz-1']);
    }).catch(error => {
      console.error('Error al navegar al quiz:', error);
    });
  }

  updateTestAccess() {
   if (this.progress.u3_su1_intro && this.progress.u3_su1_video1 && this.progress.u3_su1_video2 && this.progress.u3_su1_video3 && this.progress.u3_su1_video4 && this.progress.u3_su1_video5 && this.progress.u3_su1_quiz && this.progress.u3_su2_lectura1 && this.progress.u3_su2_video1 && this.progress.u3_su2_lectura2 && this.progress.u3_su2_lectura3) {
      this.progress.u3_su2_test_3 = true;
    } else {
      this.progress.u3_su2_test_3 = false;
    }
  }
}
