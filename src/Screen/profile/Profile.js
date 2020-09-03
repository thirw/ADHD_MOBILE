import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import information from "./Information";
import Information from "./Information";
import { auth } from "../../../firebaseService";
import firebase from "firebase";

export default class Profile extends Component {
  _isMounted = false;

  static navigationOptions = {
    title: "Profile",
  };

  constructor(props) {
    super(props);
    this.state = {
      dataChild: [],
      dataDad: [],
      dataMom: [],
      loading: true,
    };
  }

  async componentDidMount() {
    let dataUser = this.props.navigation.state.params.data; //รับค่า data จากหน้าก่อน
    let uid = this.props.navigation.state.params.uid; //หรือ รับ ค่าจาก uid
    console.log(dataUser.id);
    try {
      const resChild = await fetch(
        `https://adhd-monitor.firebaseio.com/dataprofile/${
          dataUser.id == null ? uid : dataUser.id
        }.json`
      );
      const dataChild = await resChild.json();

      const resDad = await fetch(
        `https://adhd-monitor.firebaseio.com/dataparent/father/${
          dataUser.id == null ? uid : dataUser.id
        }.json`
      );
      const dataDad = await resDad.json();

      const resMom = await fetch(
        `https://adhd-monitor.firebaseio.com/dataparent/mother/${
          dataUser.id == null ? uid : dataUser.id
        }.json`
      );
      const dataMom = await resMom.json();
      console.log(dataChild, dataDad, dataMom);
      this.setState({
        dataChild,
        dataDad,
        dataMom,
        loading: false,
      });
    } catch (e) {}
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  renderLogOut() {
    firebase
      .auth()
      .signOut()
      .then(
        function (dataUser) {
          console.log("Signed Out", dataUser);
          //this.props.navigation.navigate('LoginPage');
        },
        function (error) {
          console.error("Sign Out Error", error);
        }
      );
  }

  render() {
    if (this.state.loading == true) {
      return <ActivityIndicator size="large" />;
    }
    return (
      <ScrollView style={styles.container}>
        <View>
          <Image
            style={styles.imgProfile}
            source={require("../image/boy.png")}
          />
          <Text style={styles.txtProfile}>
            {" "}
            {this.state.dataChild.firstname} {this.state.dataChild.lastname}{" "}
          </Text>
        </View>
        <View style={styles.containerB}>
          {/* รับค่ามาจาก information ตัว dataChild dataMom dataDad อ่ะ ถ้า = คือรับ : คือคั้งใหม่ */}
          <Information
            dataChild={this.state.dataChild}
            dataDad={this.state.dataDad}
            dataMom={this.state.dataMom}
          />
        </View>

        <View style={{ flexDirection: "column" }}>
          <View>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <TouchableOpacity
                style={styles.bttContainer}
                onPress={() =>
                  this.props.navigation.navigate("editProfilePage", {
                    dataChild: this.state.dataChild,
                    dataMom: this.state.dataMom,
                    dataDad: this.state.dataDad,
                    uid: this.props.navigation.state.params.data.id,
                  })
                }
              >
                <Text style={styles.bttText}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <TouchableOpacity
                style={styles.bttContainer2}
                onPress={() => this.props.navigation.navigate("LoginPage")}
              >
                <Text style={styles.bttText}>LOGOUT</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerB: {
    flex: 2,
  },
  imgProfile: {
    width: 160,
    height: 160,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 130,
    borderRadius: 150 / 2,
    // borderColor: '#1976D2',
    // borderWidth: 2,
    marginTop: 10,
  },
  txtProfile: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 5,
  },
  bttContainer: {
    backgroundColor: "#134c85",
    paddingVertical: 15,
    width: 155,
    marginTop: 60,
    marginBottom: 20,
  },
  bttContainer2: {
    backgroundColor: "red",
    paddingVertical: 15,
    width: 150,
    marginBottom: 5,
  },
  bttText: {
    textAlign: "center",
    color: "#FFFFFF",
    fontWeight: "700",
  },
});
