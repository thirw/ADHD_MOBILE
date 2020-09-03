import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol,
} from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/Ionicons";

class HomeScreen extends React.Component {
  render() {
    return (
      <View>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <View
            style={{ width: "100%", height: 50, backgroundColor: "white" }}
          />
          <View
            style={{
              width: "100%",
              height: 598,
              backgroundColor: "powderblue",
            }}
          >
            <View>
              <Text style={styles.h2text}>All Users</Text>

              {/* <FlatList
                                data={this.state.users}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item }) =>
                                    <View style={styles.flatview}>
                                        <Text style={styles.name}>{item.name}</Text>
                                        <Text style={styles.email}>{item.email}</Text>
                                    </View>
                                }
                                keyExtractor={item => item.email}
                            /> */}
            </View>
          </View>
        </View>

        <View style={{ flex: 1, flexDirection: "row" }}>
          {/* calendar icon */}
          <TouchableOpacity
            style={{ width: wp("15%"), height: 50, backgroundColor: "#1976D2" }}
            onPress={() => this.props.navigation.navigate("calendar")}
          >
            <View style={styles.iconposition}>
              <Icon size={40} name="md-calendar" color="white" />
            </View>
          </TouchableOpacity>

          {/* search input */}
          <View
            style={{ width: wp("60%"), height: 50, backgroundColor: "#1976D2" }}
          >
            <View>
              <TextInput placeholder="Search" style={styles.input} />
            </View>
          </View>

          {/* search icon */}
          <View
            style={{ width: wp("10%"), height: 50, backgroundColor: "#1976D2" }}
          >
            <View style={styles.iconplus}>
              <Icon size={30} name="md-search" color="white" />
            </View>
          </View>

          {/* Profile icon */}
          <TouchableOpacity
            style={{ width: wp("15%"), height: 50, backgroundColor: "#1976D2" }}
            onPress={() =>
              this.props.navigation.navigate("InfoDoc", {
                data: this.state.dataUser,
              })
            }
          >
            <View style={styles.iconposition}>
              <Icon size={40} name="md-contact" color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

class SettingsScreen extends React.Component {
  render() {
    return (
      <View>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <View
            style={{ width: "100%", height: 50, backgroundColor: "white" }}
          />
          <View
            style={{
              width: "100%",
              height: 700,
              backgroundColor: "powderblue",
            }}
          >
            <View>
              <Text style={styles.h2text}>My Users</Text>

              {/* <FlatList
                                data={this.state.users}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item }) =>
                                    <View style={styles.flatview}>
                                        <Text style={styles.name}>{item.name}</Text>
                                        <Text style={styles.email}>{item.email}</Text>
                                    </View>
                                }
                                keyExtractor={item => item.email}
                            /> */}
            </View>
          </View>
        </View>

        <View style={{ flex: 1, flexDirection: "row" }}>
          {/* calendar icon */}
          <TouchableOpacity
            style={{ width: wp("15%"), height: 50, backgroundColor: "#1976D2" }}
            onPress={() => this.props.navigation.navigate("calendar")}
          >
            <View style={styles.iconposition}>
              <Icon size={40} name="md-calendar" color="white" />
            </View>
          </TouchableOpacity>

          {/* search input */}
          <View
            style={{ width: wp("60%"), height: 50, backgroundColor: "#1976D2" }}
          >
            <View>
              <TextInput placeholder="Search" style={styles.input} />
            </View>
          </View>

          {/* search icon */}
          <View
            style={{ width: wp("10%"), height: 50, backgroundColor: "#1976D2" }}
          >
            <View style={styles.iconplus}>
              <Icon size={30} name="md-search" color="white" />
            </View>
          </View>

          {/* Profile icon */}
          <TouchableOpacity
            style={{ width: wp("15%"), height: 50, backgroundColor: "#1976D2" }}
            onPress={() =>
              this.props.navigation.navigate("InfoDoc", {
                data: this.state.dataUser,
              })
            }
          >
            <View style={styles.iconposition}>
              <Icon size={40} name="md-contact" color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const TabNavigator = createBottomTabNavigator({
  MyCase: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon size={30} name="md-home" color={tintColor} />
      ),
    },
  },
  AllCase: {
    screen: SettingsScreen,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon size={30} name="md-people" color={tintColor} />
      ),
    },
  },
});

const styles = StyleSheet.create({
  iconposition: {
    margin: 5,
    marginLeft: 12,
  },
  iconplus: {
    margin: 2,
    marginLeft: 5,
    marginTop: 12,
  },
  input: {
    height: 35,
    width: wp("60%"),
    margin: 7,
    backgroundColor: "rgba(255,255,255,0.2)",
    color: "#FFF",
    paddingHorizontal: 10,
  },
  h2text: {
    marginTop: 10,
    fontFamily: "Helvetica",
    fontSize: 36,
    fontWeight: "bold",
    marginLeft: 90,
  },
  flatview: {
    justifyContent: "center",
    paddingTop: 30,
    borderRadius: 2,
  },
  name: {
    fontFamily: "Verdana",
    fontSize: 18,
  },
  email: {
    color: "red",
  },
});

export default createAppContainer(TabNavigator);
