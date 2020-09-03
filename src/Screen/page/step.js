import React, { Component } from "react";
import { View, Text } from "react-native";
import GetStep from "../services/GetStep";
export default class step extends Component {
  //set title of tab bar
  static navigationOptions = {
    title: "Steps",
  };
  constructor(props) {
    super(props);
    this.state = {
      dataChild: this.props.navigation.state.params.data,
      loading: true,
    };
  }

  async componentDidMount() {
    try {
      const resChild = await fetch(
        `https://adhd-monitor.firebaseio.com/datagraph/pedometer/${this.state.dataChild.id}.json`
      );
      const data = await resChild.json();
      console.log(data);
      //   console.log(data)
      //   this.setState({
      //     dataChild,
      //     loading: false

      //   })
    } catch (e) {}
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <GetStep data={this.state.dataChild.id} />
      </View>
    );
  }
}
