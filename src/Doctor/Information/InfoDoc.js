import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { deleteUserId } from "../../Screen/Login/saveIdService";
import { auth } from "../../../firebaseService";
import firebase from "firebase";

class componentName extends Component {
  //set title of tab bar
  static navigationOptions = {
    title: "Profile",
  };

  constructor(props) {
    super(props);
    this.state = {
      dataDoc: [],
      loading: true,
    };
  }

  async componentDidMount() {
    let dataUser = this.props.navigation.state.params.data; //รับค่า
    console.log(dataUser.id);
    try {
      const resProfile = await fetch(
        `https://adhd-monitor.firebaseio.com/datadoctor/${dataUser.id}.json`
      ); // เอา dataUser.id ไปเช็คในเบสว่าไอดีนี้เป็นใคร
      const dataDoc = await resProfile.json();

      console.log(dataDoc);
      this.setState({
        // ตั้ง state
        dataDoc,
        loading: false,
      });
    } catch (e) {}
  }

  deleteUser() {
    const { navigate } = this.props.navigation;
    auth.signOut().then(
      function () {
        deleteUserId();
        navigate("LoginPage");
        console.log("logout");
      },
      function (error) {}
    );
  }

  formatDate(date) {
    // เป็นตัวแปลงวันที่จาก เบส
    var month_name = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    var weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    var day = date.getDate();
    var mothIndex = date.getMonth() + 1;
    var year = date.getFullYear();

    return day + " " + month_name[mothIndex] + " " + year;
  }

  render() {
    if (this.state.loading == true) {
      return <View />;
    }
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            textAlign: "center",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <Text style={styles.txt1}> About Me </Text>
        </View>
        <View style={styles.txt2}>
          {/* เอาชื่อมาจากใน state ที่ set ไว้ .firstname คือจากในเบส  */}
          <Text style={styles.txt}>
            Name: {this.state.dataDoc.firstname} {this.state.dataDoc.lastname}
          </Text>
          <Text style={styles.txt}>
            Birthday: {this.formatDate(new Date(this.state.dataDoc.birthday))}
          </Text>
          <Text style={styles.txt}>
            Telephone: {this.state.dataDoc.Telephone}
          </Text>
          <Text style={styles.txt}>
            Department: {this.state.dataDoc.department}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={styles.bttContainer}
            // onPress={() => this.props.navigation.navigate('editInfo',  { dataDoc: this.state.dataDoc})}>
            onPress={() => this.props.navigation.navigate("LoginPage")}
          >
            <Text style={styles.bttText}>LOGOUT</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default componentName;

const styles = StyleSheet.create({
  txt: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 10,
  },
  txt1: {
    fontWeight: "bold",
    fontSize: 30,
  },
  txt2: {
    marginTop: 20,
    marginLeft: 20,
  },
  bttContainer: {
    backgroundColor: "red",
    paddingVertical: 15,
    width: 150,
    marginTop: 40,
    marginBottom: 50,
  },
  bttText: {
    textAlign: "center",
    color: "#FFFFFF",
    fontWeight: "700",
  },
});
