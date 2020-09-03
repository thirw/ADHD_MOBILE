import React, { Component } from "react";
import { View, Text } from "react-native";

import GetHartRate from "../../Screen/services/GetHartRate";
export default class HeartRateDoc extends Component {
  //set title of tab bar
  static navigationOptions = {
    title: "Heart Rate",
  };
  constructor(props) {
    super(props);
    this.state = {
      dataChild: this.props.navigation.state.params.dataChild,
      loading: true,
      dataUser: [],
    };
  }

  async componentDidMount() {
    try {
      const resChild = await fetch(
        `https://adhd-monitor.firebaseio.com/datagraph/heartrate/${this.state.dataChild.childId}.json`
      );
      const data = await resChild.json();
      //console.log(data)
      this.setState({
        dataUser: data,
        loading: false,
      });
      console.log("sds", dataUser);
    } catch (e) {}
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View>
          <GetHartRate data={this.state.dataChild.childId} />
        </View>
      </View>
    );
  }
}
