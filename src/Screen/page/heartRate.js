import React, { Component } from "react";
import { View, Text } from "react-native";
//import GetHartRate from '../services/GetHartRate';
import GetHartRate from "../services/GetHartRate";

export default class HeartRate extends Component {
  //set title of tab bar
  static navigationOptions = {
    title: "Heart Rate",
  };
  constructor(props) {
    super(props);
    this.state = {
      dataChild: this.props.navigation.state.params.data,
      dataID: [],
      loading: true,
    };
  }

  async componentDidMount() {
    try {
      const resChild = await fetch(
        `https://adhd-monitor.firebaseio.com/datagraph/heartrate/${this.state.dataChild.id}.json`
      );
      const data = await resChild.json();
      //console.log(data)
      this.setState({
        dataID: data,
        loading: false,
      });
    } catch (e) {}
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {/* <Text> {this.state.dataChild.id} </Text> */}
        <View>
          <GetHartRate data={this.state.dataChild.id} />
        </View>
      </View>
    );
  }
}
