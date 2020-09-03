import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createAppContainer, tabBarOptions } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack'
import HomeP from './src/Screen/Home/HomeParent'
import Login from './src/Screen/Login/Login'
import LoginFrom from './src/Screen/Login/LoginForm'
import HomeDoc from './src/Doctor/Home/HomeDoc'
//Pateint
import HeartRate from './src/Screen/page/heartRate'
import Step from './src/Screen/page/step'
import calBurn from './src/Screen/page/cal'
import blood from './src/Screen/page/blood'
import Appointment from './src/Screen/page/appointment'
//Doctor
import HeartRateDoc from './src/Doctor/pages/HeartRateDoc'
import stepDoc from './src/Doctor/pages/stepDoc'
import calBurnDoc from './src/Doctor/pages/calBurnDoc'
import bloodDoc from './src/Doctor/pages/BloodDoc'
import GetHartRate from './src/Screen/services/GetHartRate'
import GetBlood from './src/Screen/services/GetBlood'

import Profile from './src/Screen/profile/Profile'
import Detail from './src/Doctor/Detail/Detail'
import info from './src/Screen/profile/Information'
import LoginPage from './src/Screen/Login/LoginPage'
import ConfigDB from './firebaseConfig'
import InfoDoc from './src/Doctor/Information/InfoDoc'
import calendar from './src/Screen/page/calendar'
import appointmentParent from './src/Screen/page/appointmentParent'
import editProfile from './src/Screen/profile/editProfile'
import editInfo from './src/Doctor/Information/editInfo'
import LoadingPage from './src/Screen/Login/Loading'

import TestGraph from './src/Screen/TestGraph'






<ConfigDB />

const RootStack = createStackNavigator(
  {
    Login: Login,
    LoginFrom: LoginFrom,
    HomeParent: HomeP,
    HomeDoc: HomeDoc,
    HeartRate: HeartRate,
    Step: Step,
    calBurn: calBurn,
    Appointment : Appointment,
    ProfilePage : Profile,
    Detail : Detail,
    blood : blood,
    info : info,
    LoginPage : LoginPage,
    InfoDoc : InfoDoc,
    calendar :  calendar,
    appointmentParent : appointmentParent ,
    editProfilePage: editProfile,
    editInfo: editInfo,
    HeartRateDoc: HeartRateDoc,
    stepDoc:stepDoc,
    calBurnDoc:calBurnDoc,
    bloodDoc:bloodDoc,
    GetHartRate:GetHartRate,
    GetBlood:GetBlood,
    TestGraph:TestGraph,
    LoadingPage:LoadingPage
    
  },

  //select page for run
  {
    initialRouteName: 'LoginPage',

    //tab bar style
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#1976D2',


      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        justifyContent: 'space-between',
        textAlign: 'center'
      },
    }

  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {

  constructor(props) {
    super(props)

    global.__old_console_warn = global.__old_console_warn || console.warn;
    global.console.warn = (...args) => {
      let tst = (args[0] || '') + '';
      if (tst.startsWith('Setting a timer')) {
        return;
      }
      return global.__old_console_warn.apply(console, args);
    };
  }
  
  render() {
    return <AppContainer />;
  }
}


