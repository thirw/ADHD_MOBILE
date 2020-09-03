import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, Alert } from "react-native";

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from "react-native-popup-menu";
import CalendarPicker from "react-native-calendar-picker";
import { database } from "../../../firebaseService";
import { FlatList } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";
import { getUserId } from "../Login/saveIdService";

export default class appointmentParent extends Component {
  //set title of tab bar
  static navigationOptions = {
    title: "Appointment",
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
      uid: null,
      dataUser: [],
      dataChild: [],
      dataTable: [],
      schedule: [],
      searchText: "",
      searchItem: [],
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  async componentDidMount() {
    let dataUser = this.props.navigation.state.params.data;
    let mySchedule = [];
    let nowSchedule = [];

    const resChild = await fetch(
      `https://adhd-monitor.firebaseio.com/dataprofile.json`
    ); //รับค่าทั้งหมดใน dataprofile
    const dataChild = await resChild.json();

    const dataTable = database.ref("schudlue").orderByChild("id"); // ให้ไปหาจาก schedule โดยใช้ id
    dataTable.on("value", (dockey) => {
      dockey.forEach((u) => {
        //อันนี้ ลูป ข้อมูล
        if (u.val().id == dataUser.id) {
          //ถ้า ไอดี ในเบส ตรงกับ ไอดี ที่ส่งมาให้ทำในนี้
          var dateboo = "" + u.val().datebook; // ตั้งตัวแปล
          var dd = dateboo.split(".000Z"); // ตั้งตัวแปลแล้ว น่าจะไม่เอา .000z นะ
          var childId = u.val().id; // ตั้งตัวแปล
          let keys = Object.keys(dataChild); // ตั้งตัวแปล จาก dataChild

          // this.formatDate(new Date()) อันนี้มันเป็นการใช้ formatDate กูก็ไม่ค่อยร฿้เรื่องเหมือนกัน
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

            //อันนี้อ่ะไม่รู้
            if (childId == key && nowDate != myScheduleDate) {
              // nowSchedule.push(newDate)
              mySchedule.push(newDate);
            } else if (childId == key && nowDate == myScheduleDate) {
              mySchedule.push(newDate);
              nowSchedule.push(newDate);
            }
          });
        }
      });

      this.setState({
        schedule: mySchedule,
        searchItem: nowSchedule,
        uid: dataUser.id,
        // searchText: this.formatDate(new Date())
      });
      console.log(mySchedule);
      console.log(nowSchedule);
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

  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
  }

  onFilter = (date) => {
    //เหมือนค้นหาอ่ะ
    let newDate = this.formatDate(new Date(date.toString()));
    const searchResult = this.state.schedule.filter((result) => {
      let search = this.formatDate(new Date(result.start.toString()));
      console.log(search);
      return search.indexOf(newDate) !== -1;
    });

    this.setState({
      searchText: date,
      searchItem: searchResult,
    });
    console.log(newDate);
  };

  onPressPostpone(date) {
    Alert.alert(
      "Postpone an Appointment",
      "Are you sure to postpone an appointment",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => this.pushPostpone(date) },
      ],
      { cancelable: false }
    );
  }

  async pushPostpone(datePostpone) {
    let userId = this.state.uid;
    var data = {
      id: userId,
      datebook: datePostpone,
    };
    const postpone = await database.ref(`postpone`);
    postpone.push(data);

    Alert.alert("Postpone an Appointment", "Successful postponment", [
      { text: "OK", onPress: () => console.log("Success") },
    ]);
  }

  getMarkDate() {
    let allDate = this.state.schedule;
    let customDate = [];

    allDate.forEach((key) => {
      customDate.push({
        date: key.start,
        style: { backgroundColor: "#1976D2" },
        textStyle: { color: "#fff" },
        constainerStyle: [],
      });
    });
    return customDate;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          {/* ปฏิทิน */}
          <CalendarPicker
            initialDate={new Date()}
            onDateChange={this.onFilter}
            todayTextStyle={{ fontWeight: "bold" }}
            customDatesStyles={this.getMarkDate()}
          />
        </View>
        <View style={{ flex: 1, marginTop: "20%" }}>
          <ScrollView>
            <FlatList
              data={this.state.searchItem}
              keyExtractor={({ item, index }) => index}
              renderItem={({ item, index }) => (
                <View style={{ flex: 1, height: 200 }}>
                  <View style={styles.item} key={index}>
                    <MenuProvider>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text style={{ fontSize: 30, fontWeight: "bold" }}>
                          {item.title}
                        </Text>
                        <Menu>
                          <MenuTrigger>
                            <Icon size={30} name="md-information-circle" />
                          </MenuTrigger>
                          <MenuOptions>
                            <MenuOption
                              onSelect={() => this.onPressPostpone(item.start)}
                              text="Postpone"
                            />
                          </MenuOptions>
                        </Menu>
                      </View>
                      <Text style={{ fontSize: 18, color: "grey" }}>
                        {this.formatNewDate(new Date(item.start))}
                      </Text>
                    </MenuProvider>
                  </View>
                </View>
              )}
            />
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    marginTop: 10,
  },
  item: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 17,
    height: 150,
    width: 380,
    borderLeftColor: "#F0CA0F",
    borderLeftWidth: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});
