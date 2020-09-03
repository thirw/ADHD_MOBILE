import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default class Information extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: "Child",
      dataChild: [],
      dataDad: [],
      dataMom: [],
    };
  }

  componentDidMount() {
    let data = this.props.dataChild;
    let dataDad = this.props.dataDad;
    let dataMom = this.props.dataMom;
    this.setState({ dataChild: data, dataDad, dataMom });
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

    return day + " " + month_name[mothIndex] + " " + year;
  }

  renderChild() {
    return (
      <View>
        <Text style={styles.txt}>
          Nick Name: {this.state.dataChild.nickname}
        </Text>
        <Text style={styles.txt}>Gender: {this.state.dataChild.sex}</Text>
        <Text style={styles.txt}>
          Brithday: {this.formatDate(new Date(this.state.dataChild.birthday))}
        </Text>
        <Text style={styles.txt}>Weight: {this.state.dataChild.weight}</Text>
        <Text style={styles.txt}>Height: {this.state.dataChild.high}</Text>
      </View>
    );
  }

  renderFather() {
    return (
      <View>
        <Text style={styles.txt}>
          Name: {this.state.dataDad.firstname} {this.state.dataDad.lastname}
        </Text>
        <Text style={styles.txt}>
          Telephone: {this.state.dataDad.telephone}
        </Text>
        <Text style={styles.txt}>
          House Number: {this.state.dataDad.address.home}
        </Text>
        <Text style={styles.txt}>City: {this.state.dataDad.address.city}</Text>
        <Text style={styles.txt}>
          Country: {this.state.dataDad.address.country}
        </Text>
        <Text style={styles.txt}>
          Postcode: {this.state.dataDad.address.post}
        </Text>
      </View>
    );
  }
  renderMother() {
    return (
      <View>
        <Text style={styles.txt}>
          Name: {this.state.dataMom.firstname} {this.state.dataMom.lastname}
        </Text>
        <Text style={styles.txt}>
          Telephone: {this.state.dataMom.telephone}
        </Text>
        <Text style={styles.txt}>
          House Number: {this.state.dataMom.address.home}
        </Text>
        <Text style={styles.txt}>City: {this.state.dataMom.address.city}</Text>
        <Text style={styles.txt}>
          Country: {this.state.dataMom.address.country}
        </Text>
        <Text style={styles.txt}>
          Postcode: {this.state.dataMom.address.post}
        </Text>
      </View>
    );
  }

  renderTab() {
    if (this.state.tab == "Child") {
      return this.renderChild();
    } else if (this.state.tab == "Mother") {
      return this.renderMother();
    } else {
      return this.renderFather();
    }
  }

  render() {
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            textAlign: "center",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <TouchableOpacity onPress={() => this.setState({ tab: "Child" })}>
            <Text
              style={{
                fontSize: 30,
                color: this.state.tab == "Child" ? "#1976D2" : "#EEE",
              }}
            >
              Child
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginLeft: 10 }}
            onPress={() => this.setState({ tab: "Mother" })}
          >
            <Text
              style={{
                fontSize: 30,
                color: this.state.tab == "Mother" ? "#1976D2" : "#EEE",
              }}
            >
              Mother
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginLeft: 10 }}
            onPress={() => this.setState({ tab: "Father" })}
          >
            <Text
              style={{
                fontSize: 30,
                color: this.state.tab == "Father" ? "#1976D2" : "#EEE",
              }}
            >
              Father
            </Text>
          </TouchableOpacity>
        </View>

        {/* ----------------show information---------------------- */}
        <View style={{ flex: 1, marginTop: 20, marginLeft: 30 }}>
          {this.renderTab()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  txt: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 5,
  },
});
