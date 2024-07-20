import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  async login() {
    try {
      await this.authService.login(this.email, this.password);
      this.router.navigate(['/home']); // Redirige a la página principal después del login
    } catch (error) {
      console.error('Login failed:', error);
      // Manejar el error, por ejemplo, mostrar un mensaje al usuario
    }
  }

  navigateToRegister() {
    this.router.navigate(['/register']); // Redirige a la página de registro
  }
}
