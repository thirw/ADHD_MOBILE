import React, { Component } from "react";
import { View, Text } from "react-native";
import DatePicker from "react-native-datepicker";
import PureChart from "react-native-pure-chart";

export default class GetCal extends Component {
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

  getChart() {
    let sampleData = this.state.dataChart;
    return sampleData;
  }

  async getData(date) {
    let user = this.state.user;
    let datekeys = this.formatDay(date);
    console.log("User", this.state.date);
    try {
      const datagr = await fetch(
        `https://adhd-monitor.firebaseio.com/datagraph/calburn/${user}/${datekeys}.json`
      );
      const dataC = await datagr.json();
      this.formatDataNew(dataC, datekeys);
      console.log("dd", dataC);
    } catch (error) {
      this.setState({
        dataChart: "error",
        loading: false,
      });
    }
  }

  formatDay(date) {
    let d = new Date(date);
    var day = d.getDate();
    var mothIndex = (d.getMonth() + 1 < 10 ? "0" : "") + (d.getMonth() + 1);
    var year = d.getFullYear();

    return year + "-" + mothIndex;
  }

  formatDataNew(data, date) {
    let newData = [];
    let i = 0;
    let keys = Object.keys(data);

    keys.forEach((key) => {
      let time = date + "-" + key;
      let blood = data[key];
      let sum = data[key].sum;
      let sumStr = sum.toString();
      let sumFloat = Math.ceil(sumStr);
      console.log("Time " + time + " / Sum " + sumFloat);

      let obj = { x: time, y: sumFloat };
      newData.push(obj);
    });
    console.log("GG", newData);
    this.setState({
      dataChart: newData,
      loading: false,
    });
  }

  getTime(date) {
    let dateObj = new Date(date);
    var month = dateObj.getUTCMonth() + 1;
    var day = dateObj.getUTCDay();
    var year = dateObj.getUTCFullYear();
    // var strTime = hours + ':' + minutes + ' ' + ampm;
    var newdate = day + "/" + month + "/" + year;
    // var strTime = hours + ':' + minutes + ' ' + ampm;

    return newdate;
    // console.log(strTime)
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
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <View style={{ marginTop: "10%" }}>
          <DatePicker
            style={{ width: 200 }}
            date={this.state.date} //initial date from state
            mode="date" //The enum of date, datetime and time
            placeholder="select date"
            format="YYYY-MM"
            minDate="1990-01"
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

        <View
          style={{
            marginTop: "10%",
            flex: 1,
            padding: "10%",
            paddingTop: "10%",
          }}
        >
          {this.renderData()}
        </View>
      </View>
    );
  }
}
