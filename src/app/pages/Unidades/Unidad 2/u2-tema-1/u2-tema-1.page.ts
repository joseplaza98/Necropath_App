import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-u2-tema-1',
  templateUrl: './u2-tema-1.page.html',
  styleUrls: ['./u2-tema-1.page.scss'],
})
export class U2Tema1Page implements OnInit {
  selectedContent: string | null = null;
  //Videos U1 SU1
  u2_su1_video1_Url: SafeResourceUrl;
  u2_su1_video2_Url: SafeResourceUrl;

  //Videos U1 SU2
  u2_su2_video1_Url: SafeResourceUrl;

  progress: any = {

    //Sub unidad 1
    u2_su1_intro: false,
    u2_su1_video1: false,
    u2_su1_infografia: false,
    u2_su1_video2: false,
    u2_su1_quiz: false,
    
    //Sub unidad 2
    u2_su2_intro: false,
    u2_su2_infografia: false,
    u2_su2_video1: false,
    u2_su2_test_2: false,
  };

  constructor(
    private firestoreService: FirestoreService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {

    //Lista y enlaces de contenido de video
    this.u2_su1_video1_Url = this.sanitizer.bypassSecurityTrustResourceUrl('https://drive.google.com/file/d/1fY6c7hnyZ2oMubtDEFEnVGJotHQx_O46/preview');
    this.u2_su1_video2_Url = this.sanitizer.bypassSecurityTrustResourceUrl('https://drive.google.com/file/d/1LFNR2vj-m5ErVlQq6o2Ww40ITOCrz3xP/preview');
    this.u2_su2_video1_Url = this.sanitizer.bypassSecurityTrustResourceUrl('https://drive.google.com/file/d/12uMDlSo4yL897wRC5pprqiSh-wtOHMll/preview');
  }

  ngOnInit() {
    this.loadProgress();
    this.route.queryParams.subscribe(params => {
      const loadContent = params['loadContent'];
      if (loadContent) {
        this.loadContent(loadContent);
      } else {
        this.selectedContent = 'u2_su1_intro'; // Mostrar el primer contenido por defecto
      }
    });
  }

  async loadProgress() {
    try {
      const userId = await this.authService.getCurrentUserId();
      if (userId) {
        const userProgress = await this.firestoreService.getUserProgress(userId, 'unidad 2'); //Agrega la colección llamada Unidad 2 asociada con el uid del usuario registrado
        if (userProgress) {
          this.progress = userProgress;
          console.log('Progreso cargado desde Firebase:', this.progress); // Verifica si se carga correctamente
        }
        // Inicializa el progreso para el primer contenido
        if (!this.progress.u2_su1_intro) {
          this.progress.u2_su1_intro = true;
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
    const contentOrder = ['u2_su1_intro', 'u2_su1_video1', 'u2_su1_infografia', 'u2_su1_video2', 'u2_su1_quiz', 'u2_su2_intro', 'u2_su2_infografia', 'u2_su2_video1'];
    const currentIndex = contentOrder.indexOf(contentType);
    const previousContent = contentOrder[currentIndex - 1];

    if (contentType === 'u2_su1_intro' || (this.progress[previousContent] && this.progress[previousContent] !== undefined)) {
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
        console.log('Progreso para guardar:', this.progress); // Log para verificar el progreso
        await this.firestoreService.saveUserProgress(userId, 'unidad 2', this.progress);
        console.log('Progreso guardado correctamente');
      }
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  }

  nextContent() {
    const contentOrder = ['u2_su1_intro', 'u2_su1_video1', 'u2_su1_infografia', 'u2_su1_video2', 'u2_su1_quiz', 'u2_su2_intro', 'u2_su2_infografia', 'u2_su2_video1'];
    const currentIndex = contentOrder.indexOf(this.selectedContent!);
    const nextIndex = currentIndex + 1;

    if (nextIndex < contentOrder.length) {
      this.loadContent(contentOrder[nextIndex]);
    }
  }

  finishAndGoToTest() {
    this.progress.u2_su2_test_2 = true; // Marca el test como completado
    this.saveProgress().then(() => {
      this.router.navigate(['/test-2']);
    }).catch(error => {
      console.error('Error al finalizar el contenido:', error);
    });
  }

  async goToTest() {
    if (this.progress.u2_su1_intro && this.progress.u2_su1_video1 && this.progress.u2_su1_infografia && this.progress.u2_su1_video2 && this.progress.u2_su1_quiz && this.progress.u2_su2_intro && this.progress.u2_su2_infografia && this.progress.u2_su2_video1) {
      this.router.navigate(['/test-2']);
    } else {
      console.warn('Debe completar todos los contenidos antes de acceder al test.');
    }
  }

  // Navegar al quiz
  goToQuiz() {
    this.progress.u2_su1_quiz = true; // Marca el quiz como completado
    this.saveProgress().then(() => {
      console.log('Navigating to quiz-1');
      this.router.navigate(['/u2-quiz-1']);
    }).catch(error => {
      console.error('Error al navegar al quiz:', error);
    });
  }

  updateTestAccess() {
   if (this.progress.u2_su1_intro && this.progress.u2_su1_video1 && this.progress.u2_su1_infografia && this.progress.u2_su1_video2 && this.progress.u2_su1_quiz && this.progress.u2_su2_intro && this.progress.u2_su2_infografia && this.progress.u2_su2_video1) {
      this.progress.u2_su2_test_2 = true;
    } else {
      this.progress.u2_su2_test_2 = false;
    }
  }
}
