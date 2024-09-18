import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular'; // Importar AlertController

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController // Inyectar AlertController
  ) {}

  async login() {
    try {
      await this.authService.login(this.email, this.password);
      this.router.navigate(['/home']); // Redirige a la página principal después del login
    } catch (error) {
      console.error('Login failed:', error);
      await this.presentErrorAlert(error);
    }
  }

  async presentErrorAlert(error: any) {
    let message = 'Ocurrió un error. Por favor, intente nuevamente.';

    // Personalizar el mensaje según el tipo de error
    if (error.code === 'auth/invalid-email') {
      message = 'Formato del correo electrónico es inválido.';
    } else if (error.code === 'auth/user-not-found') {
      message = 'Usuario o contraseña incorrecto.';
    } else if (error.code === 'auth/wrong-password') {
      message = 'Usuario o contraseña incorrecto.';
    } else if (error.code === 'auth/network-request-failed') {
      message = 'Error de conexión. Por favor, verifique su conexión a Internet.';
    } else if (error.code === 'auth/too-many-requests') {
      message = 'Demasiados intentos fallidos. Por favor, intente más tarde.';
    }

    const alert = await this.alertController.create({
      header: 'Error de Inicio de Sesión',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  navigateToRegister() {
    this.router.navigate(['/register']); // Redirige a la página de registro
  }
}
