import React, { Component } from "react";
import { View, Text } from "react-native";
import DatePicker from "react-native-datepicker";
import PureChart from "react-native-pure-chart";

export default class GetBlood extends Component {
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
    let user = this.state.user;
    console.log("User", user, datekeys);
    try {
      const datagr = await fetch(
        `https://adhd-monitor.firebaseio.com/datagraph/bloodpressure/${user}/${datekeys}.json`
      );
      const dataB = await datagr.json();
      this.formatDataNew(dataB);
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

  formatDay(date) {
    let d = new Date(date);
    var day = d.getDate();
    var mothIndex = d.getMonth() + 1;
    var year = d.getFullYear();

    return year + "/" + mothIndex + "/" + day;
  }

  formatDataNew(data) {
    let newData = [];
    let i = 0;
    let keys = Object.keys(data);
    console.log("AAAAAA", keys);
    let objNew = [
      {
        seriesName: "min",
        data: [],
        color: "#297AB1",
      },
      {
        seriesName: "max",
        data: [],
        color: "red",
      },
    ];
    keys.forEach((key) => {
      let time = this.getTime(key);
      let bloodMin = data[key].min;
      let bloodMax = data[key].max;

      let intMax = Math.round(bloodMax);
      let intMin = Math.round(bloodMin);

      let objMax = { x: time, y: intMax };
      let objMin = { x: time, y: intMin };

      objNew[0].data.push(objMin);
      objNew[1].data.push(objMax);
    });
    console.log("GG", objNew[0]);

    this.setState({
      dataChart: objNew,
      loading: false,
    });
  }

  testChart() {
    let sampleData = [
      {
        seriesName: "max",
        data: [
          { x: "2018-02-01", y: 30 },
          { x: "2018-02-02", y: 200 },
          { x: "2018-02-03", y: 170 },
          { x: "2018-02-04", y: 250 },
          { x: "2018-02-05", y: 10 },
        ],
        color: "#297AB1",
      },
      {
        seriesName: "min",
        data: [
          { x: "2018-02-01", y: 20 },
          { x: "2018-02-02", y: 100 },
          { x: "2018-02-03", y: 140 },
          { x: "2018-02-04", y: 550 },
          { x: "2018-02-05", y: 40 },
        ],
        color: "yellow",
      },
    ];
    return sampleData;
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

  renderChart() {
    return (
      <View>
        <PureChart
          data={this.getChart()}
          type="bar"
          height={200}
          style={{ padding: 20 }}
        />
      </View>
    );
  }

  renderNoresult() {
    let sampleData = [0, 0, 0, 0, 0];
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text style={{ fontSize: 20 }}>To day not have the result</Text>
        <PureChart data={sampleData} type="bar" height={200} />
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
        <View
          style={{
            marginTop: "10%",
            flex: 1,
            padding: "10%",
            paddingTop: "10%",
          }}
        >
          {this.renderData()}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{ height: 20, width: 20, backgroundColor: "#297AB1" }}
              />
              <Text style={{ paddingLeft: 5 }}>Min</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                paddingLeft: 20,
              }}
            >
              <View style={{ height: 20, width: 20, backgroundColor: "red" }} />
              <Text style={{ paddingLeft: 5 }}>Max</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
