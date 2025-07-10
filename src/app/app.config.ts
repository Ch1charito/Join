import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'join-80a7b',
        appId: '1:789977677975:web:ec6096e9bd795ea0b029d2',
        storageBucket: 'join-80a7b.firebasestorage.app',
        apiKey: 'AIzaSyB46EgjrM_9F696WOt0EgUo9116ZWhHFPs',
        authDomain: 'join-80a7b.firebaseapp.com',
        messagingSenderId: '789977677975',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};
