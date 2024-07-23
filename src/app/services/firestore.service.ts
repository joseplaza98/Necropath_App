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

    const scoreData = {
      correctAnswers: correctAnswers,
      totalQuestions: totalQuestions
    };

    const userScoreRef = this.firestore.collection('user_scores').doc(userId);
    try {
      await userScoreRef.set(
        {
          [`Test ${testNumber}`]: scoreData
        },
        { merge: true }
      );
    } catch (error) {
      console.error('Error saving user score:', error);
      throw error;
    }
  }

  // Método para obtener los puntajes del usuario desde Firestore
  getUserScores(userId: string): Observable<any> {
    return this.firestore.collection('user_scores').doc(userId).valueChanges();
  }

  // Método para obtener el progreso del usuario desde Firestore
  async getUserProgress(userId: string, topicId: string): Promise<any> {
    if (!userId || !topicId) {
      throw new Error('User ID and topic ID are required');
    }
    
    try {
      const docRef = this.firestore.collection('user_progress').doc(userId).collection('topics').doc(topicId);
      const docSnapshot = await docRef.get().toPromise();
      
      if (docSnapshot && docSnapshot.exists) {
        return docSnapshot.data();
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error getting user progress:', error);
      throw error;
    }
  }

  // Método para guardar el progreso del usuario en Firestore
  async saveUserProgress(userId: string, topicId: string, progress: any): Promise<void> {
    if (!userId || !topicId) {
      throw new Error('User ID and topic ID are required');
    }

    const userProgressRef = this.firestore.collection('user_progress').doc(userId).collection('topics').doc(topicId);
    try {
      await userProgressRef.set(progress, { merge: true });
    } catch (error) {
      console.error('Error saving user progress:', error);
      throw error;
    }
  }
}
