import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, KeyboardAvoidingView, TouchableOpacity, StatusBar } from 'react-native';
import { TabNavigator } from 'react-native-gesture-handler'
import LoginForm from './LoginForm'


export default class Login extends Component {

  // hide tab bar
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled keyboardVerticalOffset={-500} >

        <StatusBar
          barStyle="light-content" backgroundColor={'#1976D2'}
        />

        {/* Logo */}
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image source={require('../image/logo2.png')} style={styles.logo} />

          <Text style={styles.txtTitle}>ADHD Mornitoring System</Text>
        </View>

        {/* Login */}
        <View style={styles.loginContainer}>
          <LoginForm />

          <TouchableOpacity style={styles.bttContainer}
            onPress={() => this.props.navigation.navigate('HomeParent')}>
            <Text style={styles.bttText}>LOG-IN</Text>

          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1976D2',
  },
  loginContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,

  },
  txtTitle: {
    color: '#FFF',
    marginTop: 10,
    width: 250,
    alignItems: 'center',
    opacity: 0.9,
    fontSize: 25
  },
  bttContainer: {
    backgroundColor: '#134c85',
    paddingVertical: 15,
    width: 320,

  },
  bttText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700'
  }
})



  // var icon = this.props.active
  // ? require('./src/images/logo.png')
  // : require('./src/images/logo.png');


