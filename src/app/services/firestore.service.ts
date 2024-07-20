import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore) {}

  // Método para obtener las preguntas del test desde Firestore
  getQuestions(testNumber: number): Observable<any> {
    return this.firestore.collection('questions').doc(`test-${testNumber}`).valueChanges();
  }

  // Método para guardar el puntaje del usuario en Firestore
  async saveUserScore(userId: string, testNumber: number, correctAnswers: number, totalQuestions: number): Promise<void> {
    if (!userId) throw new Error('User ID is required');

    // Define el objeto con el puntaje
    const scoreData = {
      correctAnswers: correctAnswers,
      totalQuestions: totalQuestions
    };

    // Guarda o actualiza el puntaje del usuario en la colección 'user_scores'
    const userScoreRef = this.firestore.collection('user_scores').doc(userId);
    await userScoreRef.set(
      {
        [`Test ${testNumber}`]: scoreData
      },
      { merge: true } // Usa merge para actualizar parcialmente el documento
    );
  }

  // Método para obtener los puntajes del usuario desde Firestore
  getUserScores(userId: string): Observable<any> {
    return this.firestore.collection('user_scores').doc(userId).valueChanges();
  }
}
