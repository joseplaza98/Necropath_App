import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { FirestoreService } from '../../services/firestore.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {
  editUserForm: FormGroup; // Declaramos el formulario

  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService, 
    private firestoreService: FirestoreService, 
    private router: Router,
    private toastController: ToastController
  ) {

    // Inicializar el formulario
    this.editUserForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]], // Validador para que el teléfono sea solo números
      password: ['']
    });
  }

  ngOnInit() {
    // Carga de datos del usuario al inicializar la página
    this.authService.getUserProfile().subscribe(userData => {
      if (userData) {
        this.editUserForm.patchValue({
          name: userData.name,
          surname: userData.surname,
          phone: userData.phone
        });
      }
    });
  }

  // Método para enviar el formulario y actualizar el perfil
  async onSubmit() {
    if (this.editUserForm.valid) {
      const { name, surname, phone, password } = this.editUserForm.value;
      try {
        await this.authService.updateUserProfile(name, surname, phone, password); // Llama el método de actualización con contraseña
        this.showToast('Perfil actualizado con éxito'); // Muestra la notificación
        this.router.navigate(['/home']);
      } catch (error) {
        console.error('Error al actualizar el perfil:', error);
        this.showToast('Error al actualizar el perfil'); // Muestra la notificación en caso de error
      }
    } else {
      console.error('Datos incorrectos');
      this.showToast('Por favor, complete todos los campos'); // Muestra la notificación si el formulario es inválido
    }
  }

  // Método para mostrar la notificación luego de actualizar el usuario
  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top'
    });
    await toast.present();
  }
}
