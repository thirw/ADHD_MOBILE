import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { database } from "../../../firebaseService";

export default class editProfile extends Component {
  static navigationOptions = {
    title: "Update",
  };

  constructor(props) {
    super(props);
    this.state = {
      dataChild: [],
      dataMom: [],
      dataDad: [],
      high: null,
      weight: null,
      loading: true,
    };
  }
  async componentDidMount() {
    let dataChild = this.props.navigation.state.params.dataChild;
    let dataMom = this.props.navigation.state.params.dataMom;
    let dataDad = this.props.navigation.state.params.dataDad;
    console.log(dataChild, dataMom, dataDad);

    this.setState({
      dataChild,
      dataMom,
      dataDad,
      loading: false,
    });
  }

  async updateFirebase() {
    let uid = this.props.navigation.state.params.uid;
    let high = this.state.high;
    let weight = this.state.weight;

    console.log(uid);
    const fbConnect = database.ref(`/dataprofile/${uid}`);
    var data = {
      high: high,
      weight: weight,
    };
    await fbConnect.update(data).then(() => {
      this.props.navigation.navigate("HomeParent");
    });
  }

  render() {
    if (this.state.loading == true) {
      return <View />;
    }
    return (
      <View
        style={{
          backgroundColor: "F5F5F5",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* //Child */}
        <View style={styles.updateform}>
          <View style={styles.container}>
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <View style={{ justifyContent: "center", marginLeft: 40 }}>
                <Text style={styles.txt1}>
                  {" "}
                  {this.state.dataChild.firstname}
                </Text>
              </View>
              <View style={{ justifyContent: "center", marginLeft: 30 }}>
                <Text style={styles.txt1}>{this.state.dataChild.lastname}</Text>
              </View>
            </View>
          </View>

          <View style={styles.container2}>
            {/* //Height */}
            <View style={{ justifyContent: "center", marginLeft: 50 }}>
              <Text>Height : </Text>
            </View>
            <TextInput
              style={{ height: 40 }}
              keyboardType="numeric"
              maxLength={5}
              placeholder={this.state.dataChild.high}
              onChangeText={(text) => this.setState({ high: text })}
              style={styles.container3}
            />
          </View>

          <View style={styles.container2}>
            {/* //weight */}
            <View style={{ justifyContent: "center", marginLeft: 50 }}>
              <Text>Weight : </Text>
            </View>
            <TextInput
              style={{ height: 40 }}
              keyboardType="numeric"
              maxLength={5}
              placeholder={this.state.dataChild.weight}
              onChangeText={(text) => this.setState({ weight: text })}
              style={styles.container3}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 50,
          }}
        >
          <TouchableOpacity
            style={styles.bttContainer}
            onPress={() => this.updateFirebase()}
          >
            <Text style={styles.bttText}>SAVE</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  updateform: {
    height: 180,
    width: 350,
    borderWidth: 1,
    borderRadius: 1,
    borderColor: "#ddd",
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 40,
  },
  topic: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginTop: 5,
  },
  topicWho: {
    alignItems: "center",
    textAlign: "center",
    marginTop: 20,
  },
  txt: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 10,
  },
  txt1: {
    fontWeight: "bold",
    fontSize: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  bttContainer: {
    backgroundColor: "#134c85",
    paddingVertical: 15,
    width: 150,
    marginTop: 40,
    marginBottom: 50,
  },
  bttText: {
    textAlign: "center",
    color: "#FFFFFF",
    fontWeight: "700",
  },
  container: {
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: "#828282",
    backgroundColor: "white",
  },
  container2: {
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: "#828282",
    backgroundColor: "#E8E8E8",
    flexDirection: "row",
  },
  container3: {
    width: 100,
    height: 44,
    padding: 10,
    backgroundColor: "#F5F5F5",
    margin: 10,
  },
});
