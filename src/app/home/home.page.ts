import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';  // Asegúrate de tener la ruta correcta

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  constructor(private authService: AuthService, private router: Router) {}

  async logout() {
    try {
      await this.authService.logout();
      this.router.navigateByUrl('/login');  // Redirige a la página de login
    } catch (error) {
      console.error('Logout failed', error);
    }
  }


  goToU1Tema1(){
    this.router.navigate(['/u1-tema-1']);
  }

  goToU2Tema1(){
    this.router.navigate(['/u2-tema-1']);
  }

  goToU3Tema1(){
    this.router.navigate(['/u3-tema-1']);
  }

  goToResultados() {
    this.router.navigate(['/results']);
  }

  goToQuiz1(){
    this.router.navigate(['/quiz-1']);
  }
}