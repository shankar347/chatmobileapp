// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import {getReactNativePersistence,initializeAuth} from 'firebase/auth'
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getFirestore,collection} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDv9a0i78l5RSPyt95Pzpru-AfEZrC4B2I",
  authDomain: "chatmobileapp-b438d.firebaseapp.com",
  projectId: "chatmobileapp-b438d",
  storageBucket: "chatmobileapp-b438d.appspot.com",
  messagingSenderId: "319958548543",
  appId: "1:319958548543:web:d5fda067c6d4159bdc788a",
  measurementId: "G-VVDR221K7J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



isSupported((supported)=>{
  if(supported)
  {
    const analytics = getAnalytics(app);
  }
  else{
    console.log('firebase analytics is not supported')
  }
})

export const auth=initializeAuth(app,{
    persistence:getReactNativePersistence(AsyncStorage)
})

export const db=getFirestore(app)

export const usersRef=collection(db,'users')
export const roomRef=collection(db,'rooms')
