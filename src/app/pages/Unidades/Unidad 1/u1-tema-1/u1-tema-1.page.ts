import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-u1-tema-1',
  templateUrl: './u1-tema-1.page.html',
  styleUrls: ['./u1-tema-1.page.scss'],
})
export class U1Tema1Page {
  selectedContent: string = 'video';
  videoUrl!: SafeResourceUrl;
  showMenu: boolean = true; // Control de visibilidad del menú

  private contentOrder: string[] = ['video', 'lecture', 'image'];
  private currentIndex: number = 0;

  constructor(private sanitizer: DomSanitizer, private router: Router) {
    this.updateVideoUrl();
  }

  loadContent(content: string) {
    this.selectedContent = content;
    this.currentIndex = this.contentOrder.indexOf(content);
    if (this.selectedContent === 'video') {
      this.updateVideoUrl();
    }
    this.showMenu = false; // Ocultar menú después de cargar contenido
  }

  nextContent() {
    if (this.currentIndex < this.contentOrder.length - 1) {
      this.currentIndex++;
      this.selectedContent = this.contentOrder[this.currentIndex];
      if (this.selectedContent === 'video') {
        this.updateVideoUrl();
      }
    }
  }

  goToTest() {
    this.router.navigate(['/test-1']); // Redirigir al Test 1
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  private updateVideoUrl() {
    const videoId = 'k3dv5gz4Zh0'; // ID del video de YouTube
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}`);
  }
}
