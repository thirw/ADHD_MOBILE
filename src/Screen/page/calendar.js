import React, { Component } from "react";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { View, Text, StyleSheet } from "react-native";
import { getUserId } from "../Login/saveIdService";
import { database } from "../../../firebaseService";

class calendar extends Component {
  static navigationOptions = {
    title: "Calendar",
  };
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      dataUser: [],
      dataChild: [],
      dataTable: [],
      schedule: [{}],
      mySchedule: [],
      loding: true,
      dateItem: {},
    };
  }

  async componentDidMount() {
    let uid = await getUserId();
    console.log(uid);
    let docId = "";
    await database.ref(`/alluser/${uid}/id`).once("value", (snap) => {
      docId = snap.val();
      console.log(docId);
    });

    const resChild = await fetch(
      `https://adhd-monitor.firebaseio.com/dataprofile.json`
    );
    const dataChild = await resChild.json();

    await database.ref(`/schudlue`).on("value", (snap) => {
      let mySchedule = [];
      let scheduleData = snap.val();
      let keySchedule = Object.keys(scheduleData);
      keySchedule.forEach((key) => {
        if (docId === scheduleData[key].idDoctor) {
          var dateboo = scheduleData[key].datebook;
          var dd = dateboo.split(".000Z");
          let childId = scheduleData[key].id;
          let keyChild = Object.keys(dataChild);
          keyChild.forEach((keyc) => {
            if (childId == keyc) {
              mySchedule.push({
                title: "Meeting",
                date: this.formatDate(new Date(dd[0])),
                childId: childId,
                firstname: dataChild[keyc].firstname,
                lastname: dataChild[keyc].lastname,
              });
            }
          });
          // console.log(mySchedule)
        }
      });
      this.setState({ mySchedule });
      console.log(this.state.mySchedule);
      this.formatItem();
    });
  }

  formatItem() {
    let data = this.state.mySchedule;
    let newItem = {};
    data.forEach((index) => {
      newItem[index.date] = [index];
    });
    console.log(newItem);
    this.setState({
      dateItem: newItem,
    });
  }

  formatDate(date) {
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

  render() {
    return (
      <Agenda
        items={this.state.dateItem}
        loadItemsForMonth={this.loadItems.bind(this)}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
      />
    );
  }

  loadItems(day) {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.dateItem[strTime]) {
          this.state.dateItem[strTime] = [];
          const numItems = Math.floor(Math.random() * 5);
          for (let j = 0; j < numItems; j++) {
            this.state.dateItem[strTime].push({
              name: this.state.dateItem.firstname,
              height: Math.max(50, Math.floor(Math.random() * 150)),
            });
          }
        }
      }
      //console.log(this.state.items);
      const newItems = {};
      Object.keys(this.state.dateItem).forEach((key) => {
        newItems[key] = this.state.dateItem[key];
      });
      this.setState({
        items: newItems,
      });
    }, 1000);
    // console.log(`Load Items for ${day.year}-${day.month}`);
  }

  renderItem(item) {
    return (
      <View style={[styles.item, { height: 100 }]}>
        <Text>{item.title}</Text>
      </View>
    );
  }

  renderEmptyDate() {
    return <View />;
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  }
}

export default calendar;
const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});
