import React, { Component } from "react";
import { View, Text } from "react-native";
import GetBlood from "../../Screen/services/GetBlood";

export default class BloodDoc extends Component {
  //set title of tab bar
  static navigationOptions = {
    title: "Blood Pressure",
  };
  constructor(props) {
    super(props);
    this.state = {
      dataChild: this.props.navigation.state.params.dataChild,
      dataUser: [],
      loading: true,
    };
  }

  async componentDidMount() {
    try {
      const resChild = await fetch(
        `https://adhd-monitor.firebaseio.com/datagraph/bloodpressure/${this.state.dataChild.childId}.json`
      );
      const data = await resChild.json();
      console.log(data);
      this.setState({
        dataUser: data,
        loading: false,
      });
    } catch (e) {}
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View>
          <GetBlood data={this.state.dataChild.childId} />
        </View>
      </View>
    );
  }
}
