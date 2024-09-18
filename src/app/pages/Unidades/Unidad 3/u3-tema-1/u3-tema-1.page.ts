import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  videoUrl: SafeResourceUrl;
  videoUrl2: SafeResourceUrl;
  progress: any = {
    video: false,
    lecture: false,
    image: false,
    video2: false,
    lecture2: false,
    test: false
  };

  constructor(
    private firestoreService: FirestoreService,
    private authService: AuthService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {
    // Usar las URLs de incrustación de YouTube
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://drive.google.com/file/d/1gApRULDtRi4GV4H_uqhlElzPbm0NuBk9/preview');
    this.videoUrl2 = this.sanitizer.bypassSecurityTrustResourceUrl('https://drive.google.com/file/d/1zcAgdq5ZN85S_lCe_BMuw_oFb38WVsd8/preview');
  }

  ngOnInit() {
    this.loadProgress();
    this.selectedContent = 'video'; // Mostrar el primer contenido por defecto
  }

  async loadProgress() {
    try {
      const userId = await this.authService.getCurrentUserId();
      if (userId) {
        const userProgress = await this.firestoreService.getUserProgress(userId, 'unidad 3');
        if (userProgress) {
          this.progress = userProgress;
        }
        // Inicializa el progreso para el primer contenido
        if (!this.progress.video) {
          this.progress.video = true;
          this.saveProgress();
        }
        this.updateTestAccess();
      }
    } catch (error) {
      console.error('Error loading progress:', error);
    }
  }

  loadContent(contentType: string) {
    // Permitir acceso si el contenido anterior ha sido visto
    const contentOrder = ['video', 'lecture', 'image', 'video2', 'lecture2'];
    const currentIndex = contentOrder.indexOf(contentType);
    const previousContent = contentOrder[currentIndex - 1];

    if (contentType === 'video' || (this.progress[previousContent] && this.progress[previousContent] !== undefined)) {
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
        await this.firestoreService.saveUserProgress(userId, 'unidad 3', this.progress);
      }
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  }

  nextContent() {
    const contentOrder = ['video', 'lecture', 'image', 'video2', 'lecture2'];
    const currentIndex = contentOrder.indexOf(this.selectedContent!);
    const nextIndex = currentIndex + 1;

    if (nextIndex < contentOrder.length) {
      this.loadContent(contentOrder[nextIndex]);
    }
  }

  finishAndGoToTest() {
    this.saveProgress().then(() => {
      this.router.navigate(['/test-3']);
    }).catch(error => {
      console.error('Error finishing content and navigating to test:', error);
    });
  }

  async goToTest() {
    if (this.progress.video && this.progress.lecture && this.progress.image && this.progress.video2 && this.progress.lecture2) {
      this.router.navigate(['/test-3']);
    } else {
      console.warn('Debe completar todos los contenidos antes de acceder al test.');
    }
  }

  updateTestAccess() {
    if (this.progress.video && this.progress.lecture && this.progress.image && this.progress.video2 && this.progress.lecture2) {
      this.progress.test = true;
    } else {
      this.progress.test = false;
    }
  }
}
