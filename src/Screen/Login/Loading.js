import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { database } from '../../../firebaseService'
import { saveUserId, getUserId } from '../Login/saveIdService'

export default class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

   async componentDidMount() {
        let uid = await getUserId() //รับ uid จากเครื่อง
        if (uid !== null) {
            setTimeout(() => {
                const obwho = database.ref().child('alluser/' + uid + '/who') //เช็คในเบส alluser 
                obwho.on('value', snap => {
                    var logintype = snap.val(); //snap.val() = เอาข้อมูลทะ้งหมดในเบส
                    console.log("login111");
                    switch (logintype) { // มาเช็ค เงื่อนไข ตรง who
                        case "parent": //มาจาก who ใน เบส
                            console.log(uid)
                            setTimeout(() => {
                                this.setState({ loading: true })
                                this.props.navigation.navigate('HomeParent', { uid })
                            }, 3000) //setimeout  คือ นับเวลาก่อนละค่อยมาดูข้างใน 3000 = 3วิ
                            break;
                        case "doctor":
                            setTimeout(() => {
                                this.setState({ loading: true })
                                this.props.navigation.navigate('HomeDoc', { uid })
                            }, 3000)
                            break;
                    }
                })
            }, 3000)
        } else {
            setTimeout(() => {
                this.setState({ loading: true })
                this.props.navigation.navigate('LoginPage')
            }, 3000)
        }
    }

    render() {
        return (
            <View style={styles.container} behavior="padding" enabled keyboardVerticalOffset={-500} >
                <Image source={require('../image/logo2.png')} style={styles.logo} />
                <Text style={styles.txtTitle}>ADHD Monitoring System</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1976D2',
      },
      txtTitle: {
        color: '#FFF',
        marginTop: 10,
        width: 300,
        alignItems: 'center',
        opacity: 0.9,
        fontSize: 25,
        marginBottom: 15
      },
      logo: {
        width: 150,
        height: 150,
      },
});
