import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  PermissionsAndroid,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
// import Button from "../components/Button";
import { theme } from "../core/theme";
import { CheckBox } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";

const AnswerStudent = ({ route, navigation }) => {
  const examId = route.params.id;
  const [imageFromGellary, setImageFromGellary] = useState(null);
  const [imageFromCamera, setImageFromCamera] = useState(null);
  // select image from gallery
  const pickImage = async () => {
    // try {
    // const granted = await PermissionsAndroid.request(
    // PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
    //   {
    //     title: "InstaGrade App Gellary Permission",
    //     message:
    //       "InstaGrade App needs access to your gellary " +
    //       "so you can take awesome pictures.",
    //     buttonNeutral: "Ask Me Later",
    //     buttonNegative: "Cancel",
    //     buttonPositive: "OK",
    //   }
    // );

    // if (granted === PermissionsAndroid.RESULTS.GRANTED) s{
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImageFromGellary(result.uri);
    }
    // }
    // } catch (err) {
    //   console.warn(err);
    // }
  };

  // take image from camera
  const takeFromCamera = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "InstaGrade App Camera Permission",
          message:
            "InstaGrade App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          // aspect: [4, 3],
          quality: 1,
        });
        console.log("click on camera");
        console.log(result);

        if (!result.cancelled) {
          setImageFromCamera(result.uri);
        }
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const answerRow = (choiceQue) => {
    for (let i = 0; i < choiceQue; i++) {
      for (let j = 0; j < 4; j++) {}
      list.push(
        <>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ alignContent: "center", justifyContent: "center" }}>
              {i + 1}
            </Text>
          </View>
        </>
      );
    }
  };

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
        onPress={pickImage}
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
        <View style={{ flexDirection: "column", paddingLeft: "20%" }}>
          {imageFromGellary && (
            <Image
              source={{ uri: imageFromGellary }}
              style={{ width: 40, height: 40 }}
            />
          )}
        </View>
        <View style={{ paddingLeft: "9%" }}>
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
        onPress={takeFromCamera}
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
        <View style={{ flexDirection: "column", paddingLeft: "20%" }}>
          {imageFromCamera && (
            <Image
              source={{ uri: imageFromCamera }}
              style={{ width: 40, height: 40 }}
            />
          )}
        </View>
        <View style={{ paddingLeft: "9%" }}>
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
            {/* <View style={{ flexDirection: "column" }}>{list}</View> */}
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

export default AnswerStudent;

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
