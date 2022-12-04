import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  PermissionsAndroid,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
// import Button from "../components/Button";
import { theme } from "../core/theme";
import { CheckBox } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { supabase } from "../utils/supabase-service";

const AnswerKey = ({ route, navigation }) => {
  let colection = ["A", "B", "C", "D "];

  // let colection = [{A:"", B:"", C:"", D:""}];
  const examId = route.params.id;
  const examName = route.params.name;
  const examOptions = route.params.options;
  const currentUser = supabase.auth.user();
  const [answers, setAnswers] = useState({ index: "", answer: "" });
  const [disabled, setDisabled] = useState(false);
  const [imageFromGellary, setImageFromGellary] = useState(null);
  const [imageFromCamera, setImageFromCamera] = useState(null);

  const URLpath = "https://a38e-113-162-128-159.ap.ngrok.io/file/upload/";

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
    // console.log("answer key: ", exams);
    // console.log("answer key: ", answers);
  };
  // const lists = [];
  useEffect(() => {
    loadExamDetails();
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
      mediaTypes: ImagePicker.MediaTypeOptions.All,
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

        if (!result.cancelled) {
          setImageFromGellary(null);
          setImageFromCamera(result.uri);
        }
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const AnswerRow = () => {
    const res = [];
    const lists = [];
    for (let i = 0; i < examOptions; i++) {
      lists.push(colection);
      // setAnswers({ index: i, answers: "" });
    }

    for (let i = 0; i < lists.length; i++) {
      res.push(
        <View
          style={{ flexDirection: "row", alignContent: "center" }}
          key={i + 1}
        >
          <View
            style={{
              flexDirection: "column",
              alignContent: "center",
              width: "7%",
            }}
          >
            <Text
              style={{
                display: "flex",
                bottom: 15,
                left: 10,
                position: "absolute",
                fontSize: 18,
              }}
            >
              {i + 1}
            </Text>
          </View>
          <View style={{ flexDirection: "column", width: "80%" }}>
            <RenderItem index={i + 1} />
          </View>
        </View>
      );
    }

    return res;
  };
  // const [result, setResult] = useState([]);
  const RenderItem = (props) => {
    const [A, setA] = useState(false);
    const [B, setB] = useState(false);
    const [C, setC] = useState(false);
    const [D, setD] = useState(false);
    const checkedA = () => {
      setA(true);
      setB(false);
      setC(false);
      setD(false);
      // setAnswers({ ...answers, index: props.index, answer: "A" });
      // setAnswers((prev) => ({
      //   ...prev,
      //   index: props.index,
      //   answer: "A",
      // }));
      setAnswers({ index: props.index, answer: "A" });
    };
    const checkedB = () => {
      setA(false);
      setB(true);
      setC(false);
      setD(false);
      console.log("---click B---", props.index);

      setAnswers({ index: props.index, answer: "B" });
    };

    const checkedC = () => {
      setA(false);
      setB(false);
      setC(true);
      setD(false);
      console.log("---click C---", props.index);
      // setAnswers({ ...answers, index: props.index, answer: "C" });
      // setAnswers((prev) => ({
      //   ...prev,
      //   index: props.index,
      //   answer: "C",
      // }));
      setAnswers({ index: props.index, answer: "C" });
    };
    const checkedD = () => {
      setA(false);
      setB(false);
      setC(false);
      setD(true);
      console.log("---click D---", props.index);
      // setAnswers({ ...answers, index: props.index, answer: "D" });
      // setAnswers((prev) => ({
      //   ...prev,
      //   index: props.index,
      //   answer: "D",
      // }));
      setAnswers({ index: props.index, answer: "D" });
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
    console.log("click save", answers);
    // console.log("click save2:", result);
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
          <Text onPress={Save}>Save</Text>
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
          style={{ display: "flex", right: 30, top: 15, position: "absolute" }}
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
          style={{ display: "flex", right: 30, top: 15, position: "absolute" }}
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
            {/* <form>
              {lists.map((index, input) => {
                return (
                  <View key={index}>
                    <RenderItem index={index} />
                  </View>
                );
              })}
            </form> */}
            <AnswerRow />
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
    width: "100%",
    // marginRight: "10%",
    flexDirection: "column",
  },
});
