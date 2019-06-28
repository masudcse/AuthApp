import React, { Component } from 'react';
import { Text, View, ScrollView} from 'react-native';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import * as firebase from 'firebase';


export default class SignUpScreen extends Component {
  constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			gender: '',
			age: '',
			firstName: '',
			lastName: '',
      emailError: null,
      passwordError:null,
      AgeError:null,
      FirstNameError:null,
      LastNameError:null,
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
  checkPassword=()=>{
    const {password}=this.state;
    if (this.state.password.trim() === "") {
      this.setState(() => ({ passwordError: "Password Required" }));
    }
    else{
      this.setState(() => ({ passwordError: null }));
    }
  };

   RequiredFirstName=()=>{
    const {firstName}=this.state;
    if (this.state.firstName.trim() === "") {
      this.setState(() => ({ FirstNameError: "FirstName Required" }));
    }
    else{
      this.setState(() => ({ FirstNameError: null }));
    }
  };


  RequiredLastName=()=>{
    const {lastName}=this.state;
    if (this.state.lastName.trim() === "") {
      this.setState(() => ({ LastNameError: "LastName Required" }));
    }
    else{
      this.setState(() => ({ LastNameError: null }));
    }
  };
  checkDigit=()=>{
    const {age}=this.state;
    const isValid=/^[0-9]+$/.test(String(age))
    if(!isValid){
      this.setState({
				AgeError: 'Word Not Allowed',
			});
    }
    else{
      this.setState(() => ({ AgeError: null }));
    }
  }

  signUpUser = () => {
		const { email, password, firstName, lastName, age, gender } = this.state;
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then(user => {
				console.log('user ', user);

				const userID = user.user.uid;

				firebase
					.database()
					.ref('users/' + userID)
					.set({
						firstName,
						lastName,
						age,
						gender,
					});
			});
	};
  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
				<View style={{ margin: 25 }}>
        <Input
						handleInput={text => this.handleInput('email', text)}
						onBlur={this.checkEmail}
						placeholder="Email"
						error={this.state.emailError}
					/>
        <Input
						handleInput={text => this.handleInput('password', text)}
						secureTextEntry={true}
						placeholder="Password"
            onBlur={this.checkPassword}
            error={this.state.passwordError}
					/>
        <View style={{ flexDirection: 'row' }}>
						<Input
							containerStyle={{ flex: 1 }}
							customStyle={{ flex: 1, marginRight: 5 }}
							handleInput={text => this.handleInput('firstName', text)}
							placeholder="First Name"
              onBlur={this.RequiredFirstName}
              error={this.state.FirstNameError}
						/>
						<Input
							containerStyle={{ flex: 1 }}
							customStyle={{ flex: 1 }}
							handleInput={text => this.handleInput('lastName', text)}
							placeholder="Last Name"
              onBlur={this.RequiredLastName}
              error={this.state.LastNameError}
						/>
					</View> 
          <View style={{ flexDirection: 'row' }}>
						<Input
							containerStyle={{ flex: 1 }}
							customStyle={{ flex: 1, marginRight: 5 }}
							handleInput={text => this.handleInput('age', text)}
							placeholder="Age" keyboardType = 'numeric' onBlur={this.checkDigit}
              error={this.state.AgeError}
						/>
						<Input
							containerStyle={{ flex: 1 }}
							customStyle={{ flex: 1 }}
							handleInput={text => this.handleInput('gender', text)}
							placeholder="Gender"
						/>
					</View>

					<Button onButtonPress={this.signUpUser} title="Sign Up" /> 
      </View>
    </ScrollView>
    );
  }
}
