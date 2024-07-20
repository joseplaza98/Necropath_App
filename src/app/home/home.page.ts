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

  goToTest1() {
    this.router.navigate(['/test-1']);
  }

  goToTest2() {
    this.router.navigate(['/test-2']);
  }

  goToTest3() {
    this.router.navigate(['/test-3']);
  }

  goToResultados() {
    this.router.navigate(['/results']);
  }
}