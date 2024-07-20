import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { of } from 'rxjs';  // Importa 'of' desde 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private firestore: AngularFirestore
  ) {
    this.user$ = this.afAuth.authState.pipe(
      map(user => user ? { uid: user.uid } : null)
    );
  }

  // Método de inicio de sesión
  async login(email: string, password: string): Promise<void> {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
      console.log('User logged in successfully');
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  }

  // Método de registro
  async register(email: string, password: string, name: string, surname: string, phone: number): Promise<void> {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      if (user) {
        await this.firestore.collection('users').doc(user.uid).set({
          name,
          surname,
          email,
          phone,
          uid: user.uid
        });
        console.log('User registered successfully');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      throw error;
    }
  }

  // Método para verificar si el usuario está autenticado
  isLoggedIn(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map(user => !!user)
    );
  }

  // Método para cerrar sesión
  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
      console.log('User logged out successfully');
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  }

  // Método para obtener el ID del usuario actual
  async getCurrentUserId(): Promise<string | null> {
    const user = await this.afAuth.currentUser;
    return user ? user.uid : null;
  }

  // Obtener el perfil del usuario
  getUserProfile(): Observable<any> {
    return this.user$.pipe(
      switchMap(user => {
        if (user && user.uid) {
          return this.firestore.collection('users').doc(user.uid).valueChanges();
        }
        return of(null);
      })
    );
  }

  // Método para guardar el puntaje del usuario en Firestore
  async saveUserScore(userId: string, score: number): Promise<void> {
    if (!userId) throw new Error('User ID is required');

    const userScoreRef = this.firestore.collection('user_scores').doc(userId);
    await userScoreRef.set({ score: score }, { merge: true });
  }
}
