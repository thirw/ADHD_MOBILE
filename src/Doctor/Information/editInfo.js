import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";

class componentName extends Component {
  static navigationOptions = {
    title: "Edit Profile",
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <View style={{ marginLeft: 40 }}>
          {/* //Name */}
          <View style={{ marginTop: 20 }}>
            <Text>Name : </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View>
              <TextInput
                style={{ height: 40 }}
                placeholder="Kanokchai"
                onChangeText={(text) => this.setState({ text })}
              />
            </View>
            <View>
              <TextInput
                style={{ height: 40 }}
                placeholder="Amaphut"
                onChangeText={(text) => this.setState({ text })}
              />
            </View>
          </View>

          {/* //Birthday */}
          <View>
            <Text>Birthday : </Text>
          </View>
          <TextInput
            style={{ height: 40 }}
            placeholder="27/03/2540"
            onChangeText={(text) => this.setState({ text })}
          />

          {/* //Department */}
          <View>
            <Text>Department : </Text>
          </View>
          <TextInput
            style={{ height: 40 }}
            placeholder="Mae Fah Luang Hospital"
            onChangeText={(text) => this.setState({ text })}
          />

          {/* //Telephone */}
          <View>
            <Text>Telephone : </Text>
          </View>
          <TextInput
            style={{ height: 40 }}
            placeholder="0882553150"
            onChangeText={(text) => this.setState({ text })}
          />

          {/* //Email */}
          <View>
            <Text>Email : </Text>
          </View>
          <TextInput
            style={{ height: 40 }}
            placeholder="5931305001@lamduan.mfu.ac.th"
            onChangeText={(text) => this.setState({ text })}
          />
        </View>

        {/* //ButtonSave */}
        <View style={styles.styleBtt}>
          <TouchableOpacity
            style={styles.bttContainer}
            onPress={() => this.props.navigation.navigate("ProfilePage")}
          >
            <Text style={styles.bttText}>SAVE</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default componentName;

const styles = StyleSheet.create({
  topic: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
  styleBtt: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
