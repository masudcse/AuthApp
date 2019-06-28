import React, { Component } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import Button from '../components/common/Button';
import { Facebook } from 'expo';
import * as firebase from 'firebase';

export default class LandingScreen extends Component {
  static navigationOptions = {
    header: null,
  }
  constructor(props) {
		super(props);
		this.state = {
			loading: false,
		};
  }
  componentWillMount() {
		
		firebase.auth().onAuthStateChanged(user => {
			this.setState({
				loading: false,
			});

			if (user != null) {
				this.props.navigation.replace('ProfileScreen');
			}

			
		});
	}
  async FacebookLogin() {
    const {
      type,
      token
    } = await Facebook.logInWithReadPermissionsAsync('409499829779434', {
      permission: 'public_profile',
    });
    if (type == "success") {
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      const FacebookProfile = await firebase.auth().signInWithCredential(credential);

      const userID = facebookProfile.user.uid;
      firebase.database()
				.ref('users/' + userID)
				.set({
					name: facebookProfile.user.displayName,
					email: facebookProfile.user.email,
					photo: facebookProfile.user.photoURL,
        });
        firebase.auth().onAuthStateChanged(user => {
          if (user != null) {
            this.props.navigation.replace('ProfileScreen');
          }
  
          
        });
    }
  }
  render() {
    const { loading } = this.state;

		if (loading) {
			return (
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<ActivityIndicator size="large" />
				</View>
			);
		}
    return ( 
      <View style = {
        {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }
      } >
      <Button onPress = {
        () => this.FacebookLogin()
      }
      backgroundColor = "blue"
      title = {
        'Login with Facebook'
      }
      /> 
      <Button onButtonPress={() => this.props.navigation.navigate('SignInScreen')}
					backgroundColor="orange"
					title={'Login with Email'}
      />
      <Button 
        onButtonPress={() => this.props.navigation.navigate('SignUp')} title={'Sign Up  with Email'}
      /> 
      </View>
    );
  }
}