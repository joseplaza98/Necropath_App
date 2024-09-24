import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { FirestoreService } from '../../services/firestore.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular'; // Importa ToastController

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
    private toastController: ToastController // Agrega el controlador de toast
  ) {
    // Inicializamos el formulario en el constructor
    this.editUserForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]], // Valida que sea un correo electrónico
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]], // Valida que sea solo números
      password: [''] // Agrega el campo de contraseña
    });
  }

  ngOnInit() {
    // Cargamos los datos del usuario al inicializar la página
    this.authService.getUserProfile().subscribe(userData => {
      if (userData) {
        this.editUserForm.patchValue({
          name: userData.name,
          surname: userData.surname,
          email: userData.email,
          phone: userData.phone
        });
      }
    });
  }

  // Método para enviar el formulario y actualizar el perfil
  async onSubmit() {
    if (this.editUserForm.valid) {
      const { name, surname, email, phone, password } = this.editUserForm.value;
      try {
        await this.authService.updateUserProfile(name, surname, phone, email, password); // Llama al método de actualización con contraseña
        this.showToast('Perfil actualizado con éxito'); // Muestra la notificación
        this.router.navigate(['/profile']); // Redirige a otra página después de actualizar el perfil
      } catch (error) {
        console.error('Error updating profile:', error);
        this.showToast('Error al actualizar el perfil'); // Muestra la notificación en caso de error
      }
    } else {
      console.error('Form is invalid');
      this.showToast('Por favor, complete todos los campos'); // Muestra la notificación si el formulario es inválido
    }
  }

  // Método para mostrar la notificación
  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000, // Duración en milisegundos
      position: 'top' // Posición del toast
    });
    await toast.present();
  }
}
