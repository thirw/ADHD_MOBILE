import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol,
} from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/Ionicons";
import firebase from "firebase";
import { FlatList } from "react-native-gesture-handler";

export default class HomeDoc extends Component {
  static navigationOptions = {
    title: "Home",
    headerLeft: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      tab: "MyCase", //set หน้าแรกให้โชว์ mycase
      dataUser: [],
      dataProfileAll: [],
      dataCase: [],
      dataChild: [],
      searchText: "",
      searchItem: [],
      searchTextMyCase: "",
      searchItemMyCase: [],
      hide: true,
    };
  }

  async componentDidMount() {
    let uid = this.props.navigation.state.params.uid; //get uid
    let newDataCase = [];
    let newDataProfile = [];
    let newDataProfileAll = [];
    console.log(uid);
    try {
      //มันคล้ายๆกับ ขอวพ่อ แม่อ ่ะ
      const res = await fetch(
        `https://adhd-monitor.firebaseio.com/alluser/${uid}.json`
      );
      const dataUser = await res.json();

      const resMycase = await fetch(
        `https://adhd-monitor.firebaseio.com/case/${dataUser.id}.json`
      );
      const dataCase = await resMycase.json();

      const resPatient = await fetch(
        `https://adhd-monitor.firebaseio.com/dataprofile.json`
      );
      const dataprofile = await resPatient.json();

      //get data Mycase
      for (var index in dataCase) {
        let newDa = { caseId: index, userId: dataCase[index] };
        newDataCase.push(newDa);
        console.log(newDataCase);
      }

      //get data child in case
      for (let i = 0; i <= newDataCase.length - 1; i++) {
        for (var index in dataprofile) {
          if (index == newDataCase[i].userId) {
            console.log("User id :" + newDataCase[i].userId);
            let newDa = {
              birthday: dataprofile[index].birthday,
              firstname: dataprofile[index].firstname,
              high: dataprofile[index].high,
              lastname: dataprofile[index].lastname,
              nickname: dataprofile[index].nickname,
              sex: dataprofile[index].sex,
              weight: dataprofile[index].weight,
              childId: index,
            };
            newDataProfile.push(newDa);

            console.log(newDataProfile);
          }
        }
      }

      //get data cild all
      for (var index in dataprofile) {
        let newDa = {
          birthday: dataprofile[index].birthday,
          firstname: dataprofile[index].firstname,
          high: dataprofile[index].high,
          lastname: dataprofile[index].lastname,
          nickname: dataprofile[index].nickname,
          sex: dataprofile[index].sex,
          weight: dataprofile[index].weight,
          childId: index,
        };
        newDataProfileAll.push(newDa);

        console.log(newDataProfileAll);
      }

      this.setState({
        dataUser,
        dataCase: newDataCase,
        dataChild: newDataProfile,
        dataProfileAll: newDataProfileAll,
        searchItem: newDataProfileAll,
        searchItemMyCase: newDataProfile,
        loading: false,
      });
    } catch (e) {}
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

  onFilterMyCase = (text) => {
    // ค้นหา My case
    const searchResult = this.state.dataChild.filter((result) => {
      let search = result.firstname.toLowerCase();
      return search.indexOf(text.toLowerCase()) !== -1;
    });
    this.setState({
      searchTextMyCase: text,
      searchItemMyCase: searchResult,
    });
  };

  onFilter = (text) => {
    // ค้นหา all case
    const searchResult = this.state.dataProfileAll.filter((result) => {
      let search = result.firstname.toLowerCase();
      return search.indexOf(text.toLowerCase()) !== -1;
    });
    this.setState({
      searchText: text,
      searchItem: searchResult,
    });
  };

  onSearchMyCase() {
    return (
      <View>
        <TextInput
          placeholder="Search"
          value={this.state.searchTextMyCase}
          onChangeText={this.onFilterMyCase}
          style={styles.input}
        />
      </View>
    );
  }

  onSearchAllCase() {
    return (
      <View>
        <TextInput
          placeholder="Search"
          value={this.state.searchText}
          onChangeText={this.onFilter}
          style={styles.input}
        />
      </View>
    );
  }

  renderMyCase() {
    return (
      <FlatList
        data={this.state.searchItemMyCase}
        keyExtractor={(item) => item.childId}
        renderItem={({ item, index }) => (
          <View style={{ flex: 1, marginBottom: 10 }}>
            <View style={{ width: "100%", height: 120 }} key={index}>
              <TouchableOpacity
                style={styles.mainContainer2}
                onPress={() =>
                  this.props.navigation.navigate("Detail", { data: item })
                }
              >
                <View style={{ width: "30%", backgroundColor: "white" }}>
                  <Image
                    style={styles.imgProfile}
                    source={require("../../Screen/image/boy.png")}
                  />
                </View>

                <View style={{ width: "35%", backgroundColor: "white" }}>
                  <View>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                      {item.firstname}
                    </Text>
                  </View>
                  <View>
                    <Text>Nickname: {item.nickname}</Text>
                  </View>
                  <View>
                    <Text>Gender: {item.sex}</Text>
                  </View>
                  <View>
                    <Text>Case: {item.childId}</Text>
                  </View>
                </View>

                <View style={{ width: "35%", backgroundColor: "white" }}>
                  <View>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                      {item.lastname}
                    </Text>
                  </View>
                  <View>
                    <Text>
                      Birthday:{this.formatDate(new Date(item.birthday))}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    );
  }

  renderAllCase() {
    return (
      <FlatList
        data={this.state.searchItem}
        keyExtractor={(item) => item.childId}
        renderItem={({ item, index }) => (
          <View style={{ flex: 1, marginTop: 10 }}>
            <View style={{ width: "100%", height: 120 }} key={index}>
              <TouchableOpacity
                style={styles.mainContainer2}
                onPress={() =>
                  this.props.navigation.navigate("Detail", { data: item })
                }
              >
                <View style={{ width: "30%", backgroundColor: "white" }}>
                  <Image
                    style={styles.imgProfile}
                    source={require("../../Screen/image/boy.png")}
                  />
                </View>

                <View style={{ width: "35%", backgroundColor: "white" }}>
                  <View>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                      {item.firstname}
                    </Text>
                  </View>
                  <View>
                    <Text>Nickname: {item.nickname}</Text>
                  </View>
                  <View>
                    <Text>Case: {item.childId}</Text>
                  </View>
                  <View>
                    <Text>Gender: {item.sex}</Text>
                  </View>
                </View>

                <View style={{ width: "35%", backgroundColor: "white" }}>
                  <View>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                      {item.lastname}
                    </Text>
                  </View>
                  <View>
                    <Text>
                      Birthday:{this.formatDate(new Date(item.birthday))}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    );
  }

  renderTab() {
    //ตอนกด footer อ้ะ ถ้ากด my case จะไปเอา renderMycase มาโชว์
    if (this.state.tab == "MyCase") {
      return this.renderMyCase();
    } else {
      return this.renderAllCase();
    }
  }

  renderSearch() {
    //อันนี้เป็นของ ค้นหา ถ้าอยูาในหน้า MyCase ก็จะไปค้นหาจาก Mycase
    if (this.state.tab == "MyCase") {
      return this.onSearchMyCase();
    } else {
      return this.onSearchAllCase();
    }
  }

  render() {
    if (this.state.loading == true) {
      return <View />;
    }
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          {/* calendar icon */}
          <TouchableOpacity
            style={{ width: wp("15%"), height: 50, backgroundColor: "#1976D2" }}
            // ส่ง dataUser เป็น data ไปหน้า appointment อันส่ง่ค่าก็ประมาณนี้
            onPress={() =>
              this.props.navigation.navigate("Appointment", {
                data: this.state.dataUser,
              })
            }
          >
            <View style={styles.iconposition}>
              <Icon size={40} name="md-calendar" color="white" />
            </View>
          </TouchableOpacity>

          {/* search input */}
          <View
            style={{ width: wp("60%"), height: 50, backgroundColor: "#1976D2" }}
          >
            {this.renderSearch()}
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

        <View style={{ flex: 1 }}>{this.renderTab()}</View>

        {/* //footer */}
        <View style={styles.tab}>
          <TouchableOpacity
            style={styles.tab1}
            onPress={() => this.setState({ tab: "MyCase" })}
          >
            <Icon
              size={30}
              name="md-person"
              color={this.state.tab == "MyCase" ? "#1976D2" : "#EEE"}
            />
            <Text
              style={{
                fontSize: 12,
                marginBottom: 5,
                color: this.state.tab == "MyCase" ? "#1976D2" : "#000",
              }}
            >
              My Case
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tab1}
            onPress={() => this.setState({ tab: "AllCase" })}
          >
            <Icon
              size={30}
              name="md-contacts"
              color={this.state.tab == "AllCase" ? "#1976D2" : "#EEE"}
            />
            <Text
              style={{
                fontSize: 12,
                marginBottom: 5,
                color: this.state.tab == "AllCase" ? "#1976D2" : "#000",
              }}
            >
              All Case
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  iconposition: {
    margin: 5,
    marginLeft: 12,
  },
  profileKid: {
    flex: 1,
    flexDirection: "row",
    width: 350,
    height: 80,
    backgroundColor: "red",
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "red",
    margin: 5,
    marginTop: 50,
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
  imgProfile: {
    width: 80,
    height: 100,
    margin: 5,
    // borderRadius: 150/2,
    borderColor: "#d6d7da",
    borderWidth: 0.5,
  },
  mainContainer2: {
    flex: 1,
    flexDirection: "row",
    width: 380,
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
  tab: {
    flexDirection: "row",
    height: 50,
    backgroundColor: "#fff",
    width: "100%",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#EEE",
  },
  tab1: {
    marginRight: "20%",
    marginLeft: "20%",
  },
});
