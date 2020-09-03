import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar, } from 'react-native';
import { createStackNavigator, createAppContainer, } from 'react-navigation';
import Home from '../Home/HomeParent'


export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        return (
            <View style={styles.containerB}>
                
                
                <TextInput
                    placeholder='Email'
                    backgroundColor='rgba(255,255,255,0.7)'
                    returnKeyType="next"
                    onSubmitEditing={() => this.passwordInput}
                    keyboardType='email-address'
                    autoCapitalize='none'
                    autoCorrect={false}
                    style={styles.input}
                />

                <TextInput
                    placeholder='Password'
                    backgroundColor='rgba(255,255,255,0.7)'
                    returnKeyType="go"
                    secureTextEntry
                    ref={(input) => this.passwordInput = input}
                    style={styles.input}
                />

                {/* <TouchableOpacity style={styles.bttContainer}
                
                    <Text style={styles.bttText}>LOG-IN</Text>

                </TouchableOpacity> */}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    containerB: {
        padding: 20
    },
    input: {
        height: 40,
        width: 320,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom: 20,
        color: '#FFF',
        paddingHorizontal: 10,
    },
});
    // bttContainer: {
    //     backgroundColor: '#134c85',
    //     paddingVertical: 15
    // },
    // bttText: {
    //     textAlign: 'center',
    //     color: '#FFFFFF',
    //     fontWeight: '700'
    // }

