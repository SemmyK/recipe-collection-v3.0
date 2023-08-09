// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyB_6EI2dZqaPffNPOknRRe-xN-a1zb-10E',
	authDomain: 'recipe-collection-v3.firebaseapp.com',
	projectId: 'recipe-collection-v3',
	storageBucket: 'recipe-collection-v3.appspot.com',
	messagingSenderId: '799080559967',
	appId: '1:799080559967:web:c75d1bdaa179cf213e72ea',
	measurementId: 'G-8S1CVR21LL',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export default app
