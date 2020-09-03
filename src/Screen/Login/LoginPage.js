import React, { Component } from "react";
import {
  Alert,
  Button,
  TextInput,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  Text,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import firebase from "firebase";
import { database } from "../../../firebaseService";
import { saveUserId, getUserId } from "../Login/saveIdService";

console.disableYellowBox = true;
export default class componentName extends Component {
  _isMounted = false; //เอาไว้แก้เหลือง

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      loading: false,
      dataUser: [],
    };
  }

  async componentDidMount() {
    //ให้รันข้างในนี้ก่อนละค่อยทำอันอื่น
    this._isMounted = true; //เอาไว้แก้เหลือง

    let uid = await getUserId(); //รับ uid จากเครื่อง
    if (uid !== null) {
      setTimeout(() => {
        const obwho = database.ref().child("alluser/" + uid + "/who"); //เช็คในเบส alluser
        obwho.on("value", (snap) => {
          var logintype = snap.val(); //snap.val() = เอาข้อมูลทะ้งหมดในเบส
          console.log("login111");
          switch (
            logintype // มาเช็ค เงื่อนไข ตรง who
          ) {
            case "parent": //มาจาก who ใน เบส
              console.log(uid);
              setTimeout(() => {
                this.setState({ loading: true });
                this.props.navigation.navigate("HomeParent", { uid });
              }, 3000); //setimeout  คือ นับเวลาก่อนละค่อยมาดูข้างใน 3000 = 3วิ
              break;
            case "doctor":
              setTimeout(() => {
                this.setState({ loading: true });
                this.props.navigation.navigate("HomeDoc", { uid });
              }, 3000);
              break;
          }
        });
      }, 3000);
    } else {
      setTimeout(() => {
        this.setState({ loading: true });
      }, 3000);
    }
  }

  //เอาไว้แก้เหลือง
  componentWillUnmount() {
    this._isMounted = false;
  }

  onLogin() {
    const { email, password } = this.state;
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (reg.test(email) == false) {
      alert("Invalid Email Address");
      return false;
    }
    //รับค่าจาก state ละมาเช็ค api ของ firebase
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((value) => {
        console.log(value.user.uid);
        const obwho = database
          .ref()
          .child("alluser/" + value.user.uid + "/who");
        obwho.on("value", (snap) => {
          var logintype = snap.val();
          console.log("login111");
          switch (logintype) {
            case "parent":
              console.log(value.user.uid);
              saveUserId(value.user.uid); // save uid into device
              this.props.navigation.navigate("HomeParent", {
                uid: value.user.uid,
              });
              break;
            case "doctor":
              saveUserId(value.user.uid);
              this.props.navigation.navigate("HomeDoc", {
                uid: value.user.uid,
              });
              break;
          }
        });
      })
      .catch((msgError) => {
        alert(msgError.message);
      });
  }

  render() {
    // if (this.state.loading == false) { //อันนี้เป็นหน้า splash ถ้า โหลดเสร็จจะให้เด้ง log in อันที่ else ข้างล่างอ่ะ
    //   return (
    //     <View style={styles.container} behavior="padding" enabled keyboardVerticalOffset={-500} >
    //       <Image source={require('../image/logo2.png')} style={styles.logo} />
    //       <Text style={styles.txtTitle}>ADHD Monitoring System</Text>
    //     </View>
    //   )
    // }
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        enabled
        keyboardVerticalOffset={-500}
      >
        <Image source={require("../image/logo2.png")} style={styles.logo} />

        <Text style={styles.txtTitle}>ADHD Monitoring System</Text>

        <TextInput
          value={this.state.email}
          onChangeText={(str) => this.setState({ email: str })}
          placeholder={"Email"}
          keyboardType="email-address"
          autoCorrect={false}
          style={styles.input}
        />
        <TextInput
          value={this.state.password}
          onChangeText={(str) => this.setState({ password: str })}
          placeholder={"Password"}
          returnKeyType="go"
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.bttContainer}
          onPress={this.onLogin.bind(this)}
        >
          <Text style={styles.bttText}>LOG-IN</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1976D2",
  },
  logo: {
    width: 150,
    height: 150,
  },
  txtTitle: {
    color: "#FFF",
    marginTop: 10,
    width: 300,
    alignItems: "center",
    opacity: 0.9,
    fontSize: 25,
    marginBottom: 15,
  },
  input: {
    width: 250,
    height: 44,
    padding: 10,
    backgroundColor: "rgba(255,255,255,0.2)",
    margin: 10,
  },
  bttContainer: {
    backgroundColor: "#134c85",
    paddingVertical: 15,
    width: 150,
    alignItems: "center",
    marginTop: 10,
  },
  bttText: {
    textAlign: "center",
    color: "#FFFFFF",
    fontWeight: "700",
  },
});
