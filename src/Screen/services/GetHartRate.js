import React, { Component } from "react";
import { View, Text, Dimensions } from "react-native";
import DatePicker from "react-native-datepicker";
import PureChart from "react-native-pure-chart";

export default class GetHartRate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.data,
      date: new Date(),
      axisY: [],
      axisX: [],
      dataChart: [],
      loading: true,
    };
  }
  async componentDidMount() {
    this.getData(this.state.date);
  }

  async getData(date) {
    let datekeys = this.formatDay(date);
    console.log(datekeys);
    let user = this.state.user;
    let mUser = 32019382100;

    console.log("User", user);
    //console.log(this.getDate(date))
    try {
      const datagr = await fetch(
        `https://adhd-monitor.firebaseio.com/datagraph/heartrate/${user}/${datekeys}.json`
      );
      const dataH = await datagr.json();
      this.formatDataNew(dataH);
      console.log("dd", dataH);
    } catch (error) {
      this.setState({
        dataChart: "error",
        loading: false,
      });
    }
  }

  getChart() {
    let sampleData = this.state.dataChart;
    return sampleData;
  }

  formatDataNew(data) {
    let newData = [];
    let i = 0;
    let keys = Object.keys(data);

    keys.forEach((key) => {
      let time = this.getTime(key);
      let heartBeat = data[key];

      let obj = { x: time, y: heartBeat };
      newData.push(obj);
    });
    console.log("GG", newData);
    this.setState({
      dataChart: newData,
      loading: false,
    });
  }

  axisY() {
    let Y = [40, 50, 60, 70, 80, 90, 100, 110, 120];

    return Y;
  }
  getTime(date) {
    let time = new Date(date);
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    // var strTime = hours + ':' + minutes + ' ' + ampm;
    var strTime = hours + ":" + minutes + ":" + seconds + " " + ampm;
    // var strTime = hours + ':' + minutes + ' ' + ampm;

    return strTime;
    // console.log(strTime)
  }

  formatDay(date) {
    let d = new Date(date);
    var day = d.getDate();
    var mothIndex = d.getMonth() + 1;
    //var mothIndex = ((d.getMonth() + 1) < 10 ? '0' : '') + (d.getMonth() + 1);
    var year = d.getFullYear();

    return year + "/" + mothIndex + "/" + day;
  }

  getMount(mount) {
    var mothIndex = mount.getMonth() + 1;

    return mothIndex;
  }

  getYear(year) {
    var year = year.getFullYear();

    return year;
  }

  dataLine() {
    let d = [
      40,
      50,
      60,
      70,
      80,
      90,
      100,
      110,
      120,
      40,
      50,
      60,
      70,
      80,
      90,
      100,
      110,
    ];
    let data = {
      labels: this.state.axisX,
      datasets: [
        {
          data: this.axisY(),
          color: (opacity = 1) => `rgba(25, 118, 210,  ${opacity})`, // optional
          strokeWidth: 2, // optional
        },
      ],
    };
    return data;
  }

  renderChart() {
    return (
      <View>
        <PureChart
          data={this.getChart()}
          type="line"
          height={200}
          style={{ padding: 20 }}
          customValueRenderer={(index, point) => {
            if (index % 2 === 0) return null;
            return <Text style={{ textAlign: "center" }}></Text>;
          }}
        />
      </View>
    );
  }

  renderNoresult() {
    let sampleData = [0, 0, 0, 0, 0];
    return (
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 20 }}>To day not have the result</Text>
        <PureChart
          data={sampleData}
          type="line"
          height={200}
          style={{ padding: 20 }}
          customValueRenderer={(index, point) => {
            if (index % 2 === 0) return null;
            return <Text style={{ textAlign: "center" }}></Text>;
          }}
        />
      </View>
    );
  }

  renderData() {
    if (this.state.dataChart === "error") {
      return this.renderNoresult();
    } else {
      return this.renderChart();
    }
  }

  render() {
    let d = [
      40,
      50,
      60,
      70,
      80,
      90,
      100,
      110,
      120,
      40,
      50,
      60,
      70,
      80,
      90,
      100,
      110,
      this.state.axisY[0],
    ];
    //console.log("ccccc", d)
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <View style={{ marginTop: "10%" }}>
          <DatePicker
            style={{ width: 200 }}
            date={this.state.date} //initial date from state
            mode="date" //The enum of date, datetime and time
            placeholder="select date"
            format="YYYY-MM-DD"
            minDate="1990-01-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: "absolute",
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
              },
            }}
            onDateChange={(date) => {
              this.setState({ date: date });
              this.getData(date);
            }}
          />
        </View>

        <View style={{ marginTop: "10%", flex: 1, padding: "10%" }}>
          {this.renderData()}
        </View>
      </View>
    );
  }
}
