import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/Ionicons";

export default class Detail extends Component {
  //set title of tab bar
  static navigationOptions = {
    title: "Detail",
  };
  constructor(props) {
    super(props);
    this.state = {
      dataChild: this.props.navigation.state.params.data,
      loading: false,
    };
  }

  async componentDidMount() {
    // let dataUser = this.props.navigation.state.params.data //รับ data มา
    // console.log('11111111',dataUser)
    // try {
    //   await this.setState({
    //     dataChild: dataUser,
    //     loading: false
    //   })
    // } catch (e) {
    // }
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

    return day + "/" + mothIndex + "/" + year;
  }

  render() {
    if (this.state.loading == true) {
      return <View />;
    }
    return (
      <View style={styles.mainContainer}>
        <View>
          {/*//////////////////// Flex11111111111111111111111111111111111 ////////////////////////*/}
          <View
            style={{ width: "100%", height: 150, backgroundColor: "white" }}
          >
            <View style={styles.mainContainer2}>
              <View style={styles.profileKid}>
                <View
                  style={{
                    width: "30%",
                    height: "100%",
                    backgroundColor: "white",
                  }}
                >
                  <Image
                    style={styles.imgProfile}
                    source={require("../../Screen/image/boy.png")}
                  />
                </View>

                <View
                  style={{
                    width: "35%",
                    height: "100%",
                    backgroundColor: "white",
                  }}
                >
                  <View>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                      {this.state.dataChild.firstname}
                    </Text>
                  </View>
                  <View>
                    <Text>Nickname: {this.state.dataChild.nickname}</Text>
                  </View>
                  <View>
                    <Text>Gender: {this.state.dataChild.sex}</Text>
                  </View>
                  <View>
                    <Text>Case: {this.state.dataChild.childId}</Text>
                  </View>
                </View>

                <View
                  style={{
                    width: "35%",
                    height: "100%",
                    backgroundColor: "white",
                  }}
                >
                  <View>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                      {this.state.dataChild.lastname}
                    </Text>
                  </View>
                  <View>
                    <Text>
                      Birthday:
                      {this.formatDate(new Date(this.state.dataChild.birthday))}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/*/////////////////// Flex2222222222222222222222222222222222 ////////////////////////*/}
          <View style={styles.contain0}>
            <View style={styles.mainContainer2}>
              {/*//////////////////////////// Flex Icon HeartRate///////////////////////////////// */}
              <View style={styles.contain1}>
                {/* Heat Rate */}
                <TouchableOpacity
                  style={styles.item}
                  onPress={() =>
                    this.props.navigation.navigate("HeartRateDoc", {
                      dataChild: this.state.dataChild,
                    })
                  }
                >
                  <Image
                    source={require("../../Screen/image/Heart.png")}
                    style={styles.img}
                  />
                  <Text style={styles.txt}>Heart Rate</Text>
                </TouchableOpacity>
              </View>

              {/*//////////////////////////// Flex Icon Calories Burned///////////////////////////////// */}
              <View style={styles.contain1}>
                {/* Calories */}
                <TouchableOpacity
                  style={styles.item}
                  onPress={() =>
                    this.props.navigation.navigate("calBurnDoc", {
                      dataChild: this.state.dataChild,
                    })
                  }
                >
                  <Image
                    source={require("../../Screen/image/burn.png")}
                    style={styles.img}
                  />
                  <Text style={styles.txt}>Calories Burned</Text>
                </TouchableOpacity>
              </View>

              {/*///////////////////////////// Flex Icon Blood Pressure////////////////////////////////// */}
              <View style={styles.contain1}>
                {/* Blood Pressure */}
                <TouchableOpacity
                  style={styles.item}
                  onPress={() =>
                    this.props.navigation.navigate("bloodDoc", {
                      dataChild: this.state.dataChild,
                    })
                  }
                >
                  <Image
                    source={require("../../Screen/image/pressure.png")}
                    style={styles.img}
                  />
                  <Text style={styles.txt}> Blood Pressure</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* //////////////////////////Flex3333333333333333333333333333333333333333333333 /////////////*/}
          <View style={styles.contain0}>
            <View style={styles.mainContainer2}>
              {/*//////////////////////// Flex Icon Step Workout ////////////////////////////////////*/}
              <View style={styles.contain1}>
                {/* Steps */}
                <TouchableOpacity
                  style={styles.item2}
                  onPress={() =>
                    this.props.navigation.navigate("stepDoc", {
                      dataChild: this.state.dataChild,
                    })
                  }
                >
                  <Image
                    source={require("../../Screen/image/step.png")}
                    style={styles.img}
                  />
                  <Text style={styles.txt}>Steps</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.contain1}></View>

              <View style={styles.contain1}></View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  profileKid: {
    flex: 1,
    flexDirection: "row",
    height: 100,
    width: 350,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#ddd",
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
  },
  mainContainer: {
    flex: 1,
  },
  mainContainer2: {
    flex: 1,
    flexDirection: "row",
  },
  contain0: {
    width: "100%",
    height: 206,
    backgroundColor: "white",
  },
  contain1: {
    width: "33%",
    height: "100%",
    backgroundColor: "white",
  },
  item: {
    marginTop: 50,
    margin: 10,
    height: 100,
    width: 100,
    borderRadius: 12,
    alignItems: "center",
  },
  item2: {
    marginTop: 5,
    margin: 10,
    height: 100,
    width: 100,
    borderRadius: 12,
    alignItems: "center",
  },
  img: {
    height: 80,
    width: 80,
  },
  imgProfile: {
    width: 80,
    height: 85,
    margin: 5,
    // borderRadius: 150/2,
    borderColor: "#d6d7da",
    borderWidth: 0.5,
  },
  txt: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 5,
  },
  iconposition: {
    margin: 5,
    marginLeft: 12,
  },
  profileBtt: {
    width: wp("15%"),
    height: 50,
    backgroundColor: "#1976D2",
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
});
