import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Input from '../components/common/Input';
import * as firebase from 'firebase';
import Button from '../components/common/Button';
import { StackActions, NavigationActions } from 'react-navigation';

export default class SignInScreen extends Component {
 
  constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
		};
	}

	handleInput = (key, value) => {
		this.setState({
			[key]: value,
		});
	};

	checkEmail = () => {
		const { email } = this.state;
		const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		const isValid = re.test(String(email).toLowerCase());

		if (!isValid) {
			this.setState({
				emailError: 'Invalid Email',
			});
		}
	};

	signInUser = () => {
		const { email, password } = this.state;

		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(user => {
				if (user) {
					const resetAction = StackActions.reset({
						index: 0,
						actions: [NavigationActions.navigate({ routeName: 'ProfileScreen' })],
					});

					this.props.navigation.dispatch(resetAction);
				}
			});
	};

	render() {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Input
					containerStyle={{ width: 300 }}
					handleInput={text => this.handleInput('email', text)}
					onBlur={this.checkEmail}
					placeholder="Email"
					error={this.state.emailError}
				/>

				<Input
					containerStyle={{ width: 300 }}
					handleInput={text => this.handleInput('password', text)}
					secureTextEntry={true}
					placeholder="Password"
				/>

				<Button onButtonPress={this.signInUser} title="Sign In" />
			</View>
		);
	}
}
