import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Alert,
  Image,
  // Button,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";
import { theme } from "../core/theme";
import BackButton from "../components/BackButton";
import { Input, CheckBox } from "react-native-elements";

const AnswerKey = ({ navigation }) => {
  const [answer, setAnswer] = useState([]);
  const [A, setA] = useState("");
  const [B, setB] = useState("");
  const [C, setC] = useState("");
  const [D, setD] = useState("");

  const checkedA = () => {
    setA(true);
    setB(false);
    setC(false);
    setD(false);
    console.log(A);
  };
  const checkedB = () => {
    setA(false);
    setB(true);
    setC(false);
    setD(false);
    console.log(B);
  };
  const checkedC = () => {
    setA(false);
    setB(false);
    setC(true);
    setD(false);
  };
  const checkedD = () => {
    setA(false);
    setB(false);
    setC(false);
    setD(true);
  };

  const list = [];
  for (let i = 0; i < 20; i++) {
    list.push(
      <>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ alignContent: "center", justifyContent: "center" }}>
            {i + 1}
          </Text>
          <CheckBox
            title="A"
            center
            checked={A}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            onPress={checkedA}
          />
          <CheckBox
            title="B"
            center
            checked={B}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            onPress={checkedB}
          />
          <CheckBox
            title="C"
            center
            checked={C}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            onPress={checkedC}
          />
          <CheckBox
            title="D"
            center
            checked={D}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            onPress={checkedD}
          />
          {/* <Text>{`\n`}</Text> */}
        </View>
      </>
    );
  }

  const Save = () => {
    console.log("click save");
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* header */}
      <View
        style={{
          flexDirection: "row",
          alignContent: "center",
          paddingLeft: 20,
          paddingTop: 30,
          minWidth: "100%",
          backgroundColor: theme.colors.background,
        }}
      >
        <TouchableOpacity
          onPress={navigation.goBack}
          style={{
            flexDirection: "column",
            alignContent: "center",
            minWidth: "20%",
          }}
        >
          <Image
            source={require("../assets/arrow_back.png")}
            style={{
              width: 28,
              height: 28,
            }}
          />
        </TouchableOpacity>

        <View
          style={{
            flexDirection: "column",
            alignContent: "center",
            minWidth: "60%",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              color: theme.colors.primary,
              justifyContent: "center",
              fontSize: 22,
            }}
          >
            Final Exam
          </Text>
        </View>

        <View
          style={{
            flexDirection: "column",
            alignContent: "center",
            minWidth: "10%",
          }}
        >
          <Text onPress={Save}>Save</Text>
        </View>
      </View>

      {/* Select from gallery */}
      <TouchableOpacity
        style={{
          marginTop: 20,
          flexDirection: "row",
          backgroundColor: theme.colors.background,
          minWidth: "100%",
          minHeight: 40,
          // justifyContent: "center",
          paddingLeft: 20,
          alignItems: "center",
        }}
      >
        <View
          style={{ flexDirection: "column", paddingLeft: 20, paddingRight: 20 }}
        >
          <Image
            source={require("../assets/Photo.png")}
            resizeMode="contain"
            style={{
              width: 28,
              height: 28,
              color: "#ffffff",
              backgroundColor: theme.colors.yelow,
              color: theme.colors.label,
            }}
          />
        </View>
        <View style={{ flexDirection: "column" }}>
          <Text>Select from gallery</Text>
        </View>
        <View style={{ paddingLeft: "40%" }}>
          <Image
            source={require("../assets/Arrow.png")}
            resizeMode="contain"
            style={{
              width: 14,
              height: 14,
              color: "#ffffff",
              color: theme.colors.label,
            }}
          />
        </View>
      </TouchableOpacity>

      {/* Take from camera */}
      <TouchableOpacity
        style={{
          marginTop: 5,
          flexDirection: "row",
          backgroundColor: theme.colors.background,
          minWidth: "101%",
          minHeight: 40,
          // justifyContent: "center",
          paddingLeft: 20,
          alignItems: "center",
        }}
      >
        <View
          style={{ flexDirection: "column", paddingLeft: 20, paddingRight: 20 }}
        >
          <Image
            source={require("../assets/Instagram.png")}
            resizeMode="contain"
            style={{
              width: 28,
              height: 28,
              color: "#ffffff",
              backgroundColor: theme.colors.primary,
              color: theme.colors.label,
            }}
          />
        </View>
        <View style={{ flexDirection: "column" }}>
          <Text>Take from camera</Text>
        </View>
        <View style={{ paddingLeft: "40%" }}>
          <Image
            source={require("../assets/Arrow.png")}
            resizeMode="contain"
            style={{
              width: 14,
              height: 14,
              color: "#ffffff",
              color: theme.colors.label,
            }}
          />
        </View>
      </TouchableOpacity>

      <ScrollView style={{ width: "100%" }}>
        <View style={styles.container}>
          <View style={styles.box}>
            <View style={{ flexDirection: "column" }}>{list}</View>
            {/* <CheckBox
              title="A"
              center
              checked={A}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              onPress={checkedA}
            />
            <CheckBox
              title="B"
              center
              checked={B}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              onPress={checkedB}
            />
            <CheckBox
              title="C"
              center
              checked={C}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              onPress={checkedC}
            />
            <CheckBox
              title="D"
              center
              checked={D}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              onPress={checkedD}
            />*/}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AnswerKey;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  box: {
    // backgroundColor: theme.colors.background,
    // marginLeft: "10%",
    // width: "80%",
    // height: "10%",
    // marginRight: "10%",
    flexDirection: "row",
  },
});
