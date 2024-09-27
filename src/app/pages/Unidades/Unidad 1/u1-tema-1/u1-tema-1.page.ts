import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-u1-tema-1',
  templateUrl: './u1-tema-1.page.html',
  styleUrls: ['./u1-tema-1.page.scss'],
})
export class U1Tema1Page implements OnInit {
  selectedContent: string | null = null;
  //Videos U1 SU1
  u1_su1_video1_Url: SafeResourceUrl;
  u1_su1_video2_Url: SafeResourceUrl;

  //Videos U1 SU2
  u1_su2_video1_Url: SafeResourceUrl;
  u1_su2_video2_Url: SafeResourceUrl;
  u1_su2_video3_Url: SafeResourceUrl;
  u1_su2_video4_Url: SafeResourceUrl;
  u1_su2_video5_Url: SafeResourceUrl;

  //Videos U1 SU3
  u1_su3_video1_Url: SafeResourceUrl;
  u1_su3_video2_Url: SafeResourceUrl;
  u1_su3_video3_Url: SafeResourceUrl;
  u1_su3_video4_Url: SafeResourceUrl;

  //Videos U1 SU4
  u1_su4_video1_Url: SafeResourceUrl;
  u1_su4_video2_Url: SafeResourceUrl;

  progress: any = {

    //Sub unidad 1
    u1_su1_intro: false,
    u1_su1_lectura1: false,
    u1_su1_video1: false,
    u1_su1_video2: false,
    
    //Sub unidad 2
    u1_su2_intro: false,
    u1_su2_video1: false,
    u1_su2_video2: false,
    u1_su2_video3: false,
    u1_su2_video4: false,
    u1_su2_video5: false,
    u1_su2_quiz1: false,
    
    //Sub unidad 3
    u1_su3_intro: false,
    u1_su3_video1: false,
    u1_su3_video2: false,
    u1_su3_video3: false,
    u1_su3_video4: false,
    u1_su3_quiz2: false,
    
    //Sub unidad 4
    u1_su4_intro: false,
    u1_su4_infografia: false,
    u1_su4_video1: false,
    u1_su4_video2: false,
    u1_su4_test_1: false,
  };

  constructor(
    private firestoreService: FirestoreService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {

    //Lista y enlaces de contenido de video
    this.u1_su1_video1_Url = this.sanitizer.bypassSecurityTrustResourceUrl('https://drive.google.com/file/d/1gApRULDtRi4GV4H_uqhlElzPbm0NuBk9/preview');
    this.u1_su1_video2_Url = this.sanitizer.bypassSecurityTrustResourceUrl('https://drive.google.com/file/d/1zcAgdq5ZN85S_lCe_BMuw_oFb38WVsd8/preview');
    this.u1_su2_video1_Url = this.sanitizer.bypassSecurityTrustResourceUrl('https://drive.google.com/file/d/19Yh09G-sXhzspeuzxOHbhVHt1usimwxu/preview');
    this.u1_su2_video2_Url = this.sanitizer.bypassSecurityTrustResourceUrl('https://drive.google.com/file/d/1CKRPmz35f7BgLSNaK93ufZ6z_jwV_SQU/preview');
    this.u1_su2_video3_Url = this.sanitizer.bypassSecurityTrustResourceUrl('https://drive.google.com/file/d/1iLPTWOrvRwjFopcZ-Eqycsne3A66oUjs/preview');
    this.u1_su2_video4_Url = this.sanitizer.bypassSecurityTrustResourceUrl('https://drive.google.com/file/d/1zygRnEZbCgqTLflWatMNMOLEZPvSJekX/preview');
    this.u1_su2_video5_Url = this.sanitizer.bypassSecurityTrustResourceUrl('https://drive.google.com/file/d/1d83ivrrIEEB2PBltBCO6AWZ2i8OvAqco/preview');
    this.u1_su3_video1_Url = this.sanitizer.bypassSecurityTrustResourceUrl('https://drive.google.com/file/d/1qKnAHaszBsvdJ-x_NaN_IEamSDW9Qewv/preview');
    this.u1_su3_video2_Url = this.sanitizer.bypassSecurityTrustResourceUrl('https://drive.google.com/file/d/1Qs5ivS9bRip7ME2MmHx4lpyGolRwiVx2/preview');
    this.u1_su3_video3_Url = this.sanitizer.bypassSecurityTrustResourceUrl('https://drive.google.com/file/d/1Dnlop4mIW3hI1VGP7-luGVz14vXI6vs5/preview');
    this.u1_su3_video4_Url = this.sanitizer.bypassSecurityTrustResourceUrl('https://drive.google.com/file/d/1F57bwhnZVP56C2bQMwXsAKYFsUKYpuSO/preview');
    this.u1_su4_video1_Url = this.sanitizer.bypassSecurityTrustResourceUrl('https://drive.google.com/file/d/1MIUlyK3HfE00FQ73iejdKo1O8hE9566S/preview');
    this.u1_su4_video2_Url = this.sanitizer.bypassSecurityTrustResourceUrl('https://drive.google.com/file/d/1S8YRMHiaQ0tK9lpArlVOLpptWITla2qB/preview');

  }

  ngOnInit() {
    this.loadProgress();
    this.route.queryParams.subscribe(params => {
      const loadContent = params['loadContent'];
      if (loadContent) {
        this.loadContent(loadContent);
      } else {
        this.selectedContent = 'u1_su1_intro'; // Mostrar el primer contenido por defecto
      }
    });
  }

  async loadProgress() {
    try {
      const userId = await this.authService.getCurrentUserId();
      if (userId) {
        const userProgress = await this.firestoreService.getUserProgress(userId, 'unidad 1'); //Agrega la colección llamada Unidad 2 asociada con el uid del usuario registrado
        if (userProgress) {
          this.progress = userProgress;
          console.log('Progreso cargado desde Firebase:', this.progress); // Verifica si se carga correctamente
        }
        // Inicializa el progreso para el primer contenido
        if (!this.progress.u1_su1_intro) {
          this.progress.u1_su1_intro = true;
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
    const contentOrder = ['u1_su1_intro', 'u1_su1_lectura1', 'u1_su1_video1', 'u1_su1_video2','u1_su2_intro', 'u1_su2_video1', 'u1_su2_video2', 'u1_su2_video3', 'u1_su2_video4', 'u1_su2_video5', 'u1_su2_quiz1', 'u1_su3_intro', 'u1_su3_video1', 'u1_su3_video2', 'u1_su3_video3', 'u1_su3_video4', 'u1_su3_quiz2', 'u1_su4_intro', 'u1_su4_infografia', 'u1_su4_video1', 'u1_su4_video2'];
    //const contentOrder = ['video', 'lecture', 'image', 'quiz', 'video2', 'lecture2'];
    const currentIndex = contentOrder.indexOf(contentType);
    const previousContent = contentOrder[currentIndex - 1];

    if (contentType === 'u1_su1_intro' || (this.progress[previousContent] && this.progress[previousContent] !== undefined)) {
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
        await this.firestoreService.saveUserProgress(userId, 'unidad 1', this.progress);
        console.log('Progreso guardado correctamente');
      }
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  }

  nextContent() {
    const contentOrder = ['u1_su1_intro', 'u1_su1_lectura1', 'u1_su1_video1', 'u1_su1_video2','u1_su2_intro', 'u1_su2_video1', 'u1_su2_video2', 'u1_su2_video3', 'u1_su2_video4', 'u1_su2_video5', 'u1_su2_quiz1', 'u1_su3_intro', 'u1_su3_video1', 'u1_su3_video2', 'u1_su3_video3', 'u1_su3_video4', 'u1_su3_quiz2', 'u1_su4_intro', 'u1_su4_infografia', 'u1_su4_video1', 'u1_su4_video2'];
    //const contentOrder = ['video', 'lecture', 'image', 'quiz', 'video2', 'lecture2'];
    const currentIndex = contentOrder.indexOf(this.selectedContent!);
    const nextIndex = currentIndex + 1;

    if (nextIndex < contentOrder.length) {
      this.loadContent(contentOrder[nextIndex]);
    }
  }

  finishAndGoToTest() {
    this.progress.u1_su4_test_1 = true; // Marca el test como completado
    this.saveProgress().then(() => {
      this.router.navigate(['/test-1']);
    }).catch(error => {
      console.error('Error al finalizar el contenido:', error);
    });
  }

  async goToTest() {
    if (this.progress.u1_su1_intro && this.progress.u1_su1_lectura1 && this.progress.u1_su1_video1 && this.progress.u1_su1_video2 && this.progress.u1_su2_intro && this.progress.u1_su2_video1 && this.progress.u1_su2_video2 && this.progress.u1_su2_video3 && this.progress.u1_su2_video4 && this.progress.u1_su2_video5 && this.progress.u1_su2_quiz1 && this.progress.u1_su3_intro && this.progress.u1_su3_video1 && this.progress.u1_su3_video2 && this.progress.u1_su3_video3 && this.progress.u1_su3_video4 && this.progress.u1_su3_quiz2 && this.progress.u1_su4_intro && this.progress.u1_su4_infografia && this.progress.u1_su4_video1 && this.progress.u1_su4_video2) {
    //if (this.progress.video && this.progress.lecture && this.progress.image && this.progress.quiz && this.progress.video2 && this.progress.lecture2) {
      this.router.navigate(['/test-1']);
    } else {
      console.warn('Debe completar todos los contenidos antes de acceder al test.');
    }
  }

  // Navegar al quiz
  goToQuiz() {
    this.progress.u1_su2_quiz1 = true; // Marca el quiz como completado
    this.saveProgress().then(() => {
      console.log('Navigating to quiz-1');
      this.router.navigate(['/quiz-1']);
    }).catch(error => {
      console.error('Error al navegar al quiz 1:', error);
    });
  }

    // Navegar al quiz
    goToQuiz2() {
      this.progress.u1_su3_quiz2 = true; // Marca el quiz como completado
      this.saveProgress().then(() => {
        console.log('Navigating to quiz-2');
        this.router.navigate(['/quiz-2']);
      }).catch(error => {
        console.error('Error al navegar al quiz 2:', error);
      });
    }

  updateTestAccess() {
   if (this.progress.u1_su1_intro && this.progress.u1_su1_lectura1 && this.progress.u1_su1_video1 && this.progress.u1_su1_video2 && this.progress.u1_su2_intro && this.progress.u1_su2_video1 && this.progress.u1_su2_video2 && this.progress.u1_su2_video3 && this.progress.u1_su2_video4 && this.progress.u1_su2_video5 && this.progress.u1_su2_quiz1 && this.progress.u1_su3_intro && this.progress.u1_su3_video1 && this.progress.u1_su3_video2 && this.progress.u1_su3_video3 && this.progress.u1_su3_video4 && this.progress.u1_su3_quiz2 && this.progress.u1_su4_intro && this.progress.u1_su4_infografia && this.progress.u1_su4_video1 && this.progress.u1_su4_video2) {
    // if (this.progress.video && this.progress.lecture && this.progress.image && this.progress.quiz && this.progress.video2 && this.progress.lecture2) {
      this.progress.u1_su4_test_1 = true;
    } else {
      this.progress.u1_su4_test_1 = false;
    }
  }
}
