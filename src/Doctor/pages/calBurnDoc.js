import React, { Component } from "react";
import { View, Text } from "react-native";
import GetCal from "../../Screen/services/GetCal";
import GetBlood from "../../Screen/services/GetBlood";

export default class calBurnDoc extends Component {
  //set title of tab bar
  static navigationOptions = {
    title: "Calories Burned",
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
        `https://adhd-monitor.firebaseio.com/datagraph/calburn/${this.state.dataChild.childId}.json`
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
          <GetCal data={this.state.dataChild.childId} />
        </View>
      </View>
    );
  }
}
