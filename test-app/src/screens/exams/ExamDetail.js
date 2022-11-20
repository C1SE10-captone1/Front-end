import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Alert,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import { theme } from "../../core/theme";
import { supabase } from "../../utils/supabase-service";

let colection = {
  id: "",
  name: "",
  date_exam: "",
  class_id: "",
  description: "",
  scale: "",
  option: "",
};
const ExamDetail = ({ route, navigation }) => {
  const examId = route.params.id;
  const [exam, setExam] = useState(colection);
  const [disable, setDisable] = useState(true);
  const currentUser = supabase.auth.user();

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

    // console.log(exams);
    setExam(exams);
  };

  const isAnswerStudent = async () => {
    let { data: answer_students, error } = await supabase
      .from("answer_students")
      .select("*")
      .eq("exam_id", examId);

    if (answer_students !== null) {
      setDisable(true);
    } else if (answer_students === null) {
      setDisable(false);
    }
  };

  useEffect(() => {
    loadExamDetails();
    isAnswerStudent();
  }, []);

  const Edit = () => {
    console.log("click edit");
  };
  const Delete = () => {
    Alert.alert(
      "Confirm delete!",
      "Are you sure delete Exam " + exam[0].name + " ?",
      [
        {
          text: "Yes",
          onPress: async () => {
            const { error } = await supabase
              .from("exams")
              .update({ is_delete: true })
              .eq("id", examId);
            console.log("error: ", error);
            if (error) {
              Alert.alert("Failed", "Delete failed", [
                {
                  text: "Back",
                },
              ]);
            } else {
              Alert.alert(
                "Success!",
                "Delete Exam " + exam[0].name + " success.",
                [
                  {
                    text: "OK",
                    onPress: () => {
                      navigation.goBack();
                    },
                  },
                ]
              );
            }
          },
        },
        {
          text: "No",
        },
      ]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* header title */}
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
            minWidth: "30%",
          }}
        >
          <Image
            source={require("../../assets/arrow_back.png")}
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
            paddingBottom: 10,
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
            Exam Detail
          </Text>
        </View>
      </View>
      {/* end header title */}

      <View style={styles.controller}>
        <FlatList
          keyExtractor={(item) => item.id.toFixed()}
          data={exam}
          renderItem={({ item }) => {
            return (
              <View>
                <View style={styles.content}>
                  <Text style={styles.name_exam}>
                    {item.classes.name} ({item.classes.class_code})
                  </Text>
                  <Text style={styles.name_exam}>{item.name}</Text>
                </View>
                <View style={styles.date}>
                  <Text>{item.date_exam}</Text>
                </View>
                <View style={styles.note}>
                  <Text style={{ fontWeight: "italic" }}>
                    {item.description}
                  </Text>
                </View>
                <View style={styles.note}>
                  <Text style={{ flexDirection: "column" }}>
                    question: {item.option}
                  </Text>

                  <Text style={{ flexDirection: "column", marginLeft: "40%" }}>
                    Scale: {item.scale}
                  </Text>
                </View>
              </View>
            );
          }}
        />
        {/* manage */}
        <View style={styles.manage}>
          <Text style={{ fontsize: 12, color: theme.colors.label }}>
            Manager
          </Text>
        </View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() =>
            navigation.navigate("AnswerKey", {
              id: examId,
              name: exam[0].name,
              options: exam[0].option,
              // scale: exam[0].scale,
            })
          }
        >
          <View style={{ flexDirection: "column" }}>
            <Image
              source={require("../../assets/Jackdaw.png")}
              resizeMode="contain"
              style={{
                width: 28,
                height: 28,
                elevation: 0,
                borderRadius: 7,
                color: theme.colors.label,
                backgroundColor: theme.colors.primary,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "column",
              paddingLeft: 20,
              paddingTop: 3,
            }}
          >
            <Text>Enter answer of exams</Text>
          </View>
          <View style={{ flexDirection: "column" }}>
            <Image
              source={require("../../assets/Arrow.png")}
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
                paddingLeft: "90%",
                color: theme.colors.label,
              }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() =>
            navigation.navigate("AnswerStudent", {
              id: examId,
              name: exam[0].name,
              options: exam[0].option,
              // scale: exam[0].scale,
            })
          }
        >
          <View style={{ flexDirection: "column" }}>
            <Image
              source={require("../../assets/Instagram.png")}
              resizeMode="contain"
              style={{
                width: 28,
                height: 28,
                backgroundColor: theme.colors.primary,
                elevation: 0,
                borderRadius: 7,
                color: theme.colors.label,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "column",
              paddingLeft: 20,
              paddingTop: 3,
            }}
          >
            <Text>Enter answer of students</Text>
          </View>
          <View style={{ flexDirection: "column" }}>
            <Image
              source={require("../../assets/Arrow.png")}
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
                paddingLeft: "87%",
                color: theme.colors.label,
              }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={disable}
          style={styles.btn}
          onPress={() => navigation.navigate("Result")}
        >
          <View style={{ flexDirection: "column" }}>
            {disable ? (
              <Image
                source={require("../../assets/Textbook.png")}
                resizeMode="contain"
                style={{
                  width: 28,
                  height: 28,
                  elevation: 0,
                  borderRadius: 7,
                  //  backgroundColor : theme.colors.primary,
                  backgroundColor: theme.colors.label,
                }}
              />
            ) : (
              <Image
                source={require("../../assets/Textbook.png")}
                resizeMode="contain"
                style={{
                  width: 28,
                  height: 28,
                  elevation: 0,
                  borderRadius: 7,
                  backgroundColor: theme.colors.primary,
                  // backgroundColor : theme.colors.label,
                }}
              />
            )}
          </View>
          <View
            style={{
              flexDirection: "column",
              paddingLeft: 20,
              paddingTop: 3,
            }}
          >
            <Text>Results</Text>
          </View>
          <View style={{ flexDirection: "column" }}>
            <Image
              source={require("../../assets/Arrow.png")}
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
                paddingLeft: "115%",
                elevation: 0,
                color: theme.colors.label,
              }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={disable}
          style={styles.btn}
          onPress={() => navigation.navigate("AnalystExam")}
        >
          <View style={{ flexDirection: "column" }}>
            {disable ? (
              <Image
                source={require("../../assets/Group.png")}
                resizeMode="contain"
                style={{
                  width: 28,
                  height: 28,
                  elevation: 0,
                  borderRadius: 7,
                  backgroundColor: theme.colors.label,
                }}
              />
            ) : (
              <Image
                source={require("../../assets/Group.png")}
                resizeMode="contain"
                style={{
                  width: 28,
                  height: 28,
                  elevation: 0,
                  borderRadius: 7,
                  backgroundColor: theme.colors.primary,
                }}
              />
            )}
          </View>
          <View
            style={{
              flexDirection: "column",
              paddingLeft: 20,
              paddingTop: 3,
            }}
          >
            <Text>Exam analysis</Text>
          </View>
          <View style={{ flexDirection: "column" }}>
            <Image
              source={require("../../assets/Arrow.png")}
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
                paddingLeft: "105%",
                elevation: 0,
                color: theme.colors.label,
              }}
            />
          </View>
        </TouchableOpacity>
      </View>

      {/* button edit */}
      <View>
        <Button
          mode="outlined"
          style={styles.btn_edit}
          onPress={Edit}
          color={theme.colors.text}
        >
          Edit exam
        </Button>
      </View>
      {/* button delete */}
      <View>
        <Button
          mode="outlined"
          style={styles.btn_delete}
          onPress={Delete}
          color={theme.colors.error}
        >
          Delete exam
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default ExamDetail;

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flexDirection: "column",
    marginTop: 20,
    paddingLeft: 30,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: theme.colors.background,
  },
  name_class: {
    color: theme.colors.primary,
    flexDirection: "row",
    textTransform: "uppercase",
    fontWeight: "italic",
    letterSpacing: 1,
    paddingBottom: 6,
  },
  name_exam: {
    color: theme.colors.text,
    lexDirection: "row",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  date: {
    backgroundColor: theme.colors.background,
    color: theme.colors.label,
    fontWeight: "italic",
    letterSpacing: 3,
    fontsize: 12,
    paddingLeft: 30,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 5,
  },
  note: {
    backgroundColor: theme.colors.background,
    paddingLeft: 30,
    marginTop: 5,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: "row",
  },
  manage: {
    paddingLeft: 30,
    marginTop: 20,
  },
  btn: {
    paddingLeft: 30,
    marginTop: 5,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: theme.colors.background,
    flexDirection: "row",
  },

  btn_delete: {
    fontWeight: "normal",
    elevation: 0,
  },
  btn_edit: {
    elevation: 0,
    fontWeight: "normal",
  },
});
