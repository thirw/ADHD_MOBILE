import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/Ionicons";
import { getUserId } from "../Login/saveIdService";
import { database } from "../../../firebaseService";
//Noti
import { Notifications } from "expo";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

export default class HomeParent extends Component {
  //set title of tab bar
  static navigationOptions = {
    title: "Home",
    headerLeft: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      dataUser: [],
      dataProfile: [],
      schedule: [],
      searchItem: [],
    };
  }

  async componentDidMount() {
    let uid = this.props.navigation.state.params.uid; //รับ uid มา
    let userId = await getUserId(); //รับ uid มาจากเครื่อง

    console.log("savee", userId);

    try {
      const res = await fetch(
        `https://adhd-monitor.firebaseio.com/alluser/${uid}.json`
      ); //เอา id ีuser จาก uid
      const dataUser = await res.json();

      const resProfile = await fetch(
        `https://adhd-monitor.firebaseio.com/dataprofile${dataUser.id}.json`
      ); //หาข้อมูลจาก id
      const dataProfile = await resProfile.json();

      console.log(dataProfile);
      this.setState({
        dataUser,
        dataProfile,
      });
      console.log(dataUser);
      this.regisNoti();
      this.schedule();
    } catch (e) {}
  }

  checkLastDate = (data) => {
    let sortData = data.sort((a, b) => {
      a = new Date(a.start);
      b = new Date(b.start);

      return b - a;
    });
    return sortData;
    // console.log(sortData)
  };

  async schedule() {
    let mySchedule = [];
    let nowSchedule = [];
    let data = this.state.dataUser.id;

    // console.log("ddddddddd", data)

    const resChild = await fetch(
      `https://adhd-monitor.firebaseio.com/dataprofile.json`
    ); //รับค่าทั้งหมดใน dataprofile
    const dataChild = await resChild.json();

    const dataTable = database.ref("schudlue").orderByChild("id");
    dataTable.on("value", (dockey) => {
      //console.log("gggggggg",dockey)
      dockey.forEach((u) => {
        //console.log("lol", u)
        if (u.val().id == data) {
          //console.log(data)
          var dateboo = "" + u.val().datebook; // ตั้งตัวแปล
          var dd = dateboo.split(".000Z"); // ตั้งตัวแปลแล้ว น่าจะไม่เอา .000z นะ
          var childId = u.val().id; // ตั้งตัวแปล
          let keys = Object.keys(dataChild);

          let nowDate = this.formatDate(new Date());
          let myScheduleDate = this.formatDate(new Date(dd[0]));

          keys.forEach((key) => {
            // ลูปข้อมูลเหมือนเดิม
            let newDate = {
              //ตั้งตัวแปลจากเบส
              title: "Meeting",
              start: dd[0],
              childId: childId,
            };
            //console.log("Hello world", newDate)

            //อันนี้อ่ะไม่รู้
            if (childId == key) {
              // nowSchedule.push(newDate)
              mySchedule.push(newDate);
              //console.log(mySchedule)
            }
          });
        }
      });
      console.log("My", this.checkLastDate(mySchedule)[0]);
      // this.sendNoti(this.checkLastDate(mySchedule)[0])
    });

    this.setState({
      schedule: this.checkLastDate(mySchedule),
    });
  }

  formatDate(date) {
    //แปลงวันจาก เบส
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
    var hours = date.getHours();
    var min = date.getMinutes();

    return year + "-" + mothIndex + "-" + day;
  }

  formatNewDate(date) {
    // แปลงให้มันเป็น วัน วันที่ ชื่อเดือน ปี เวลา
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
    var hours = date.getHours();
    var min = date.getMinutes();

    return (
      weekday[date.getDay()] +
      " " +
      day +
      " " +
      " Month " +
      "" +
      mothIndex +
      " " +
      year +
      "\nTime " +
      hours +
      ":" +
      min
    );
  }

  async regisNoti() {
    let result = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (Constants.isDevice && result.status === "granted") {
      console.log("Notification permissions granted.");
    }
    // this.sendNoti()
  }

  sendNoti = (data) => {
    let date = new Date();

    const localNotification = {
      title: "You got an appointment",
      body: this.formatNewDate(new Date(data.start)),
    };
    const schedulingOptions = {
      time: date.getTime(),
    };
    // Notifications show only when app is not active.
    // (ie. another app being used or device's screen is locked)
    Notifications.scheduleLocalNotificationAsync(
      localNotification,
      schedulingOptions
    );
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        {/* Status Bar */}
        <StatusBar barStyle="light-content" backgroundColor={"#1976D2"} />
        <View style={styles.containerA}>
          {/* Profile Buttom*/}
          <View style={styles.containerProfile}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              <View
                style={{
                  width: wp("85%"),
                  height: 50,
                  backgroundColor: "#FFFFFF",
                }}
              />

              {/* ส่ง dataUser ไป โดยเปลี่ยนชื่อให้เป็น data*/}
              <TouchableOpacity
                style={styles.profileBtt}
                onPress={() =>
                  this.props.navigation.navigate("ProfilePage", {
                    data: this.state.dataUser,
                  })
                }
              >
                <View style={styles.iconposition}>
                  <Icon size={40} name="md-contact" color="white" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {/* Profile image */}
          <Image
            style={styles.imgProfile}
            source={require("../image/boy.png")}
          />
          <View />
        </View>

        <View style={styles.containerB}>
          <View style={styles.containerC}>
            {/* Heat Rate */}
            <TouchableOpacity
              style={styles.item}
              onPress={() =>
                this.props.navigation.navigate("HeartRate", {
                  data: this.state.dataUser,
                })
              }
            >
              <Image
                source={require("../image/Heart.png")}
                style={styles.img}
              />
              <Text style={styles.txt}>Heart Rate</Text>
            </TouchableOpacity>
            {/* Calories */}
            <TouchableOpacity
              style={styles.item}
              onPress={() =>
                this.props.navigation.navigate("calBurn", {
                  data: this.state.dataUser,
                })
              }
            >
              <Image source={require("../image/burn.png")} style={styles.img} />
              <Text style={styles.txt}>Calories Burned</Text>
            </TouchableOpacity>
            {/* Blood*/}
            <TouchableOpacity
              style={styles.item}
              onPress={() =>
                this.props.navigation.navigate("blood", {
                  data: this.state.dataUser,
                })
              }
            >
              <Image
                source={require("../image/pressure.png")}
                style={styles.img}
              />
              <Text style={styles.txt}>Blood Pressure</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.containerC}>
            {/* Steps */}
            <TouchableOpacity
              style={styles.item}
              onPress={() =>
                this.props.navigation.navigate("Step", {
                  data: this.state.dataUser,
                })
              }
            >
              <Image source={require("../image/step.png")} style={styles.img} />
              <Text style={styles.txt}>Steps</Text>
            </TouchableOpacity>
            {/* Appointment */}
            <TouchableOpacity
              style={styles.item}
              onPress={() =>
                this.props.navigation.navigate("appointmentParent", {
                  data: this.state.dataUser,
                })
              }
            >
              <Image
                source={require("../image/calendar.png")}
                style={styles.img}
              />
              <Text style={styles.txt}>Appoint</Text>
              <Text style={styles.txt}>ment</Text>
            </TouchableOpacity>
            <View style={styles.item}></View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  containerProfile: {
    flex: 1,
    justifyContent: "space-between",
    marginTop: 10,
    flexDirection: "row",
  },
  containerA: {
    flex: 1,
  },
  containerB: {
    flex: 2,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  containerC: {
    flex: 2,
    width: wp("100%"),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  item: {
    height: 100,
    width: 100,
    borderRadius: 12,
    alignItems: "center",
  },
  img: {
    height: 80,
    width: 80,
  },
  imgProfile: {
    width: 160,
    height: 160,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 130,
    borderRadius: 150 / 2,
    // borderColor: '#1976D2',
    // borderWidth: 2
  },
  txt: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 5,
  },
  iconposition: {
    margin: 5,
    marginLeft: 12,
  },
  profileBtt: {
    width: wp("15%"),
    height: 50,
    backgroundColor: "#1976D2",
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
});
