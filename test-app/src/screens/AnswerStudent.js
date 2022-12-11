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

const AnswerStudent = ({ route, navigation }) => {
  const examId = route.params.id;
  const examName = route.params.name;
  const examOptions = route.params.options;
  const scale = route.params.scale;
  const classId = route.params.class_id;
  const currentUser = supabase.auth.user();
  const [answer, setAnswer] = useState();
  const [student, setStudent] = useState();
  const [answerKey, setAnswerKey] = useState([]);
  let arr = new Map();
  const [imageFromGellary, setImageFromGellary] = useState(null);
  const [imageFromCamera, setImageFromCamera] = useState(null);

  // remember url after change domain
  const URLpath =
    "https://a38e-113-162-128-159.ap.ngrok.io/file/upload-answer-student/";

  const getAnswerKeyAndScale = async () => {
    let { data: answer_exams, error } = await supabase
      .from("answer_exams")
      .select(`answers, exams(id, is_delete)`)
      .eq("exam_id", examId)
      .eq("exams.is_delete", false);
    setAnswerKey(answer_exams[0].answers);
  };

  useEffect(() => {
    getAnswerKeyAndScale();
  }, []);
  // select image from gallery
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImageFromGellary(result.uri);
    }
  };

  // take image from camera
  const takeFromCamera = async () => {
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        // aspect: [4, 3],
        quality: 1,
      });
      console.log(result);

      if (!result.cancelled) {
        setImageFromCamera(result.uri);
      }
    }
  };

  let ans = new Set();
  const Save = async () => {
    console.log("click save");
    let count = 0;
    arr.forEach(function (value, key) {
      if (value === answerKey[key]) {
        count++;
      }
    });
    console.log(answerKey);
    // console.log(testSet);
    console.log((count * scale).toFixed(1));
    let { data: students, error } = await supabase
      .from("students")
      .select("id")
      .eq("student_code", "25211216336")
      .eq("class_id", classId);
    // const { data, error1 } = await supabase.from("answer_students").insert([
    //   {
    //     exam_id: examId,
    //     student_id: students[0].id,
    //     answers: ans,
    //     point: (count * scale).toFixed(1),
    //   },
    // ]);

    // console.log(error1);
  };

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

export default AnswerStudent;

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
