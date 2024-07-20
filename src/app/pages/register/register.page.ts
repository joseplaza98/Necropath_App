import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  name: string = '';
  surname: string = '';
  email: string = '';
  phone: string = ''; // Asegúrate de que este es un string en lugar de number
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  async register() {
    try {
      // Convertir el teléfono a número si la función espera un número
      const phoneNumber: number = parseInt(this.phone, 10);
      const userCredential = await this.authService.register(this.email, this.password, this.name, this.surname, phoneNumber);
      // Redirige a la página de inicio de sesión después de registrarse
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Registration failed:', error);
      // Manejar el error, por ejemplo, mostrar un mensaje al usuario
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']); // Redirige a la página de inicio de sesión
  }
}
