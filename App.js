import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigation from './src/AppNavigation';
import * as firebase from 'firebase';

export default class extends React.Component {
  componentWillMount(){
    const firebaseConfig = {
      apiKey: "AIzaSyBs0HfQzv4cl2GONE4egGvIOiScks7BZ3U",
      authDomain: "authapp-9a608.firebaseapp.com",
      databaseURL: "https://authapp-9a608.firebaseio.com",
      projectId: "authapp-9a608",
      storageBucket: "authapp-9a608.appspot.com",
      messagingSenderId: "728241049411",
      appId: "1:728241049411:web:1d7afb70f7cfdb16"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
  render(){
      return <AppNavigation />
}
}
