import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  PermissionsAndroid,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
// import Button from "../components/Button";
import { theme } from "../core/theme";
import { CheckBox } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { supabase } from "../utils/supabase-service";

function createArrayWithNumbers(length) {
  return Array.from({ length }, (_, i) => i);
}

const AnswerKey = ({ route, navigation }) => {
  // let colection = ["A", "B", "C", "D "];

  const examId = route.params.id;
  const examName = route.params.name;
  const examOptions = route.params.options;
  const currentUser = supabase.auth.user();
  const [imageFromGellary, setImageFromGellary] = useState(null);
  const [imageFromCamera, setImageFromCamera] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const URLpath =
    "https://a38e-113-162-128-159.ap.ngrok.io/file/upload-answer-key/";

  const answered = [];

  const loadAnswerd = () => {
    return answered.push(
      { index: 1, answer: "A" },
      { index: 2, answer: "B" },
      { index: 3, answer: "C" },
      { index: 4, answer: "D" },
      { index: 5, answer: "A" },
      { index: 6, answer: "A" },
      { index: 7, answer: "B" },
      { index: 8, answer: "C" },
      { index: 9, answer: "D" },
      { index: 10, answer: "A" },
      { index: 11, answer: "A" },
      { index: 12, answer: "B" },
      { index: 13, answer: "C" },
      { index: 14, answer: "D" },
      { index: 15, answer: "A" },
      { index: 16, answer: "A" },
      { index: 17, answer: "B" },
      { index: 18, answer: "C" },
      { index: 19, answer: "D" },
      { index: 20, answer: "A" }
    );
  };

  const loadExamDetails = async () => {
    let { data: exams, error } = await supabase
      .from("exams")
      .select(
        `id, name, date_exam, scale, option, description,
          class_id,
          classes (
          id, name, class_code
        )
      `
      )
      .eq("id", examId)
      .eq("is_delete", false)
      .eq("classes.uid", currentUser.id);
  };

  useEffect(() => {
    loadExamDetails();
    setTimeout(async () => {
      loadAnswerd();
    }, 1000);
  }, [imageFromCamera, imageFromGellary]);
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

    // if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageFromCamera(null);
      setImageFromGellary(result.uri);
    }
    // }
    // } catch (err) {
    //   console.warn(err);
    // }
  };

  // take image from camera
  const takeFromCamera = async () => {
    // try {
    //   const granted = await PermissionsAndroid.request(
    //     PermissionsAndroid.PERMISSIONS.CAMERA,
    //     {
    //       title: "InstaGrade App Camera Permission",
    //       message:
    //         "InstaGrade App needs access to your camera " +
    //         "so you can take awesome pictures.",
    //       buttonNeutral: "Ask Me Later",
    //       buttonNegative: "Cancel",
    //       buttonPositive: "OK",
    //     }
    //   );
    //   if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageFromGellary(null);
      setImageFromCamera(result.uri);
    }

    // } catch (err) {
    //   console.warn(err);
    // }
  };

  let arr = new Map();
  const RenderItem = (props) => {
    const [A, setA] = useState(props.answer === "A" ? true : false);
    const [B, setB] = useState(props.answer === "B" ? true : false);
    const [C, setC] = useState(props.answer === "C" ? true : false);
    const [D, setD] = useState(props.answer === "D" ? true : false);
    const checkedA = () => {
      setA(true);
      setB(false);
      setC(false);
      setD(false);
      arr.set(props.index, "A");
    };
    const checkedB = () => {
      setA(false);
      setB(true);
      setC(false);
      setD(false);
      arr.set(props.index, "B");
    };

    const checkedC = () => {
      setA(false);
      setB(false);
      setC(true);
      setD(false);
      arr.set(props.index, "C");
    };
    const checkedD = () => {
      setA(false);
      setB(false);
      setC(false);
      setD(true);
      arr.set(props.index, "D");
    };
    return (
      <View style={{ flexDirection: "row" }}>
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
      </View>
    );
  };

  const Save = () => {
    console.log("click save");
    arr.forEach(function (value, key) {
      console.log(key + " = " + value);
    });

    answered.map((e) => {
      console.log(e.index + " , " + e.answer);
    });

    var urlImage = "";
    if (imageFromCamera !== null) urlImage = imageFromCamera;
    if (imageFromGellary !== null) urlImage = imageFromGellary;
    let match = /\.(\w+)$/.exec(urlImage);
    let type = match ? `image/${match[1]}` : `image`;

    // var formData = new FormData();
    // formData.append("file", {
    //   uri: urlImage,
    //   name: urlImage.split("/").pop(),
    //   type: type,
    // });

    // fetch(URLpath, {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "multipart/form-data",
    //   },
    //   body: formData,
    // })
    //   .then((responseJson) => {
    //     console.log("response: ", responseJson);
    //   })
    //   .catch((error) => {
    //     console.log("error: ", error);
    //   });
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
              width: 24,
              height: 24,
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
            {examName}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "column",
            alignContent: "center",
            minWidth: "10%",
          }}
        >
          <TouchableOpacity onPress={Save}>
            <Text>Save</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Select from gallery */}
      <TouchableOpacity
        // disabled={disabled}
        onPress={pickImage}
        style={{
          marginTop: 20,
          flexDirection: "row",
          backgroundColor: theme.colors.background,
          minWidth: "100%",
          minHeight: 50,
          // justifyContent: "center",
          paddingLeft: 20,
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "column",
            paddingLeft: 20,
            paddingRight: 20,
          }}
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
        <View
          style={{
            flexDirection: "column",
            display: "flex",
            top: 0,
            right: 80,
            position: "absolute",
          }}
        >
          {imageFromGellary && (
            <Image
              source={{ uri: imageFromGellary }}
              style={{ width: 50, height: 50 }}
            />
          )}
        </View>
        <View
          style={{
            display: "flex",
            right: 30,
            top: 15,
            position: "absolute",
          }}
        >
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
        // disabled={disabled}
        onPress={takeFromCamera}
        style={{
          marginTop: 5,
          flexDirection: "row",
          backgroundColor: theme.colors.background,
          minWidth: "100%",
          minHeight: 50,
          // justifyContent: "center",
          paddingLeft: 20,
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "column",
            paddingLeft: 20,
            paddingRight: 20,
          }}
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
        <View
          style={{
            flexDirection: "column",
            display: "flex",
            top: 0,
            right: 80,
            position: "absolute",
          }}
        >
          {imageFromCamera && (
            <Image
              source={{ uri: imageFromCamera }}
              style={{ width: 50, height: 50 }}
            />
          )}
        </View>
        <View
          style={{
            display: "flex",
            right: 30,
            top: 15,
            position: "absolute",
          }}
        >
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
            {createArrayWithNumbers(examOptions).map((index) => {
              return (
                <View style={{ flexDirection: "row" }} key={index + 1}>
                  <View
                    style={{
                      flexDirection: "column",
                      alignContent: "center",
                      justifyContent: "center",
                      fontSize: 20,
                      width: "7%",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                      }}
                    >
                      {index + 1}.
                    </Text>
                  </View>
                  <View style={{ flexDirection: "column" }}>
                    <RenderItem index={index + 1} />
                  </View>
                </View>
              );
            })}
            {/* <Text>{answered.length}</Text>
            {answered.map((e) => {
              return (
                <View style={{ flexDirection: "row" }} key={index + 1}>
                  <View
                    style={{
                      flexDirection: "column",
                      alignContent: "center",
                      justifyContent: "center",
                      fontSize: 20,
                      width: "7%",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                      }}
                    >
                      {index + 1}.
                    </Text>
                  </View>
                  <View style={{ flexDirection: "column" }}>
                    <RenderItem index={index + 1} answer={e.answer} />
                  </View>
                </View>
              );
            })} */}
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
    // marginLeft: "10%",
    paddingLeft: 7,
    width: "100%",
    // marginRight: "10%",
    flexDirection: "column",
  },
});
