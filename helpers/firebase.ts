import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { FirebaseUserCredentials } from 'types/firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyBAJVFx6lD4e7H7ZVzlf9Oyo980MZ9qYrQ',
  authDomain: 'jarchiwum-811aa.firebaseapp.com',
  databaseURL: 'https://jarchiwum-811aa.firebaseio.com',
  projectId: 'jarchiwum-811aa',
  storageBucket: 'jarchiwum-811aa.appspot.com',
  messagingSenderId: '600942471247',
  appId: '1:600942471247:web:b210d4c5357340c18fe23a',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const firebaseSignIn = ({ email, password }: FirebaseUserCredentials) =>
  firebase.auth().signInWithEmailAndPassword(email, password);

export const firebaseCreateUser = ({
  email,
  password,
}: FirebaseUserCredentials) =>
  firebase.auth().createUserWithEmailAndPassword(email, password);

export const firebaseAuthStateChange = (
  handler: (user: firebase.User | null) => void
) => firebase.auth().onAuthStateChanged((user) => handler(user));

export const firebaseSignOut = () => firebase.auth().signOut();

export type FirebaseUser = firebase.auth.UserCredential;

export const firebaseErrorHandler = (code: string) => {
  switch (code) {
    case 'auth/email-already-in-use':
      return 'Podany e-mail już istnieje.';
    case 'auth/invalid-email':
      return 'Blędny e-mail.';
    case 'auth/too-many-requests':
      return 'Zbyt wiele prób.';
    case 'auth/operation-not-allowed':
      return 'Rejestracja jest zablokowana.';
    case 'auth/weak-password':
      return 'Zbyt proste hasło.';
    case 'auth/user-disabled':
      return 'Użytkownik został zablokowany.';
    case 'auth/user-not-found':
      return 'Użytkownik nie istnieje.';
    case 'auth/wrong-password':
      return 'Błędne hasło.';
    default:
      return 'Błąd serwera.';
  }
};

export const firestore = firebase.firestore();
