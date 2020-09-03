import React, { Component } from "react";
import { View, Text } from "react-native";
import GetStep from "../../Screen/services/GetStep";

export default class stepDoc extends Component {
  //set title of tab bar
  static navigationOptions = {
    title: "Steps",
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
        `https://adhd-monitor.firebaseio.com/datagraph/pedometer/${this.state.dataChild.childId}.json`
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
          <GetStep data={this.state.dataChild.childId} />
        </View>
      </View>
    );
  }
}
