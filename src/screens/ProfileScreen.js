import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Button from '../components/common/Button';
import * as firebase from 'firebase';
export default class ProfileScreen extends Component {
  componentDidMount() {
		let userId = firebase.auth().currentUser.uid;
		console.log('userId ', userId);

		return firebase
			.database()
			.ref('/users/' + userId)
			.once('value')
			.then(function(snapshot) {
				var username = (snapshot.val() && snapshot.val().username);
				console.log('snapshot ', snapshot.val());
			});
	}
render() {
    return (
      <View>
        <Text> ProfileScreen </Text>
        <Button title="Sign Out" onButtonPress={() => firebase.auth().signOut()} />
      </View>
    );
  }
}
