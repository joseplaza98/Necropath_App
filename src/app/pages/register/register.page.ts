import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  name: string = '';
  surname: string = '';
  email: string = '';
  phone: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) {}

  async register() {
    try {
      const phoneNumber: number = parseInt(this.phone, 10);
      await this.authService.register(this.email, this.password, this.name, this.surname, phoneNumber);
      await this.presentSuccessAlert();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      await this.presentErrorAlert(error);
    }
  }

  //Alerta si el inicio de sesión es correcto
  async presentSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Registro Exitoso',
      message: 'Te has registrado correctamente.',
      buttons: ['OK']
    });

    await alert.present();
  }

//Alerta si el inicio de sesión es incorrecto
  async presentErrorAlert(error: any) {
    let message = 'Ocurrió un error. Por favor, intente nuevamente.';

    // Personalizar el mensaje según el tipo de error
    if (error.code === 'auth/invalid-email') {
      message = 'El formato del correo electrónico es inválido.';
    } else if (error.code === 'auth/email-already-in-use') {
      message = 'No se puede usar esta dirección de correo electrónico.';
    } else if (error.code === 'auth/weak-password') {
      message = 'La contraseña debe tener al menos 6 caracteres.';
    } else if (error.code === 'auth/network-request-failed') {
      message = 'Error de conexión. Por favor, verifique su conexión a Internet.';
    } else if (error.code === 'auth/too-many-requests') {
      message = 'Demasiados intentos fallidos. Por favor, intente más tarde.';
    }

    const alert = await this.alertController.create({
      header: 'Error de Registro',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
