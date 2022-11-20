import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Alert,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import { theme } from "../../core/theme";
import BackButton from "../../components/BackButton";
import { supabase } from "../../utils/supabase-service";

let colectionClass = {
  id: "",
  name: "",
  class_code: "",
  is_delete: "",
  // created_at: "",
  // update_at: "",
  description: "",
  school_year: "",
  semester: "",
  uid: "",
};

const ClassDetail = ({ route, navigation }) => {
  const classId = route.params.id;
  const [classe, setClasses] = useState(colectionClass);
  const currentUser = supabase.auth.user();
  const [numberStudent, setNumberStudent] = useState(0);
  const [numberExam, setNumberExam] = useState(0);

  // number exams of a class
  const updateNumberExamOfClass = async () => {
    let { data: exams, error } = await supabase
      .from("exams")
      .select("count()")
      .eq("class_id", classId);

    console.log("number exam :", exams[0].count);
    exams[0].count > 0 ? setNumberExam(exams[0].count) : setNumberExam(0);
  };

  // number students of a class
  const updateNumberStudentOfClass = async () => {
    let { data: students, error } = await supabase
      .from("students")
      .select("count()")
      .eq("class_id", classId);

    console.log("number student :", students[0].count);
    students[0].count > 0
      ? setNumberStudent(students[0].count)
      : setNumberStudent(0);
  };

  const loadClassDetail = async () => {
    let { data: classes, error } = await supabase
      .from("classes")
      .select("*")
      .eq("uid", currentUser.id)
      .eq("is_delete", false)
      .eq("id", classId);

    setClasses(classes);
  };

  useEffect(() => {
    loadClassDetail();
    updateNumberExamOfClass();
    updateNumberStudentOfClass();
  }, []);

  const Edit = () => {
    console.log("click edit");
  };
  const listExamOfClass = () => {
    console.log("click exams");
    // navigation.
    navigation.navigate("ListExamByClass", {
      id: classId,
    });
  };
  const Delete = () => {
    Alert.alert(
      "Confirm delete!",
      "Are you sure delete Class " + classe[0].name + "?",
      [
        {
          text: "Yes",
          onPress: async () => {
            const { error } = await supabase
              .from("classes")
              .insert([{ is_delete: true }]);
            if (error) {
              Alert.alert(
                "Error!",
                "Delete Class " + classe[0].name + " failed?",
                [
                  {
                    text: "OK",
                    onPress: () => {},
                  },
                ]
              ); //
            } else {
              Alert.alert(
                "Success!",
                "Delete Class " + classe[0].name + " successfull.",
                [
                  {
                    text: "OK",
                    onPress: () => {},
                  },
                ]
              ); //
            }
            return;
          },
        },
        {
          text: "No",
        },
      ]
    );
  };

  return (
    // <></>
    <SafeAreaView style={{ flex: 1 }}>
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
            Class Detail
          </Text>
        </View>
      </View>
      <View style={styles.controller}>
        <FlatList
          keyExtractor={(item) => item.id.toFixed()}
          data={classe}
          renderItem={({ item }) => {
            return (
              <View>
                <View style={styles.content}>
                  <Text style={styles.name_class}>{item.name}</Text>
                  <Text style={{}}> ({item.class_code})</Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    backgroundColor: theme.colors.background,
                    marginTop: 5,
                  }}
                >
                  <View style={styles.note}>
                    <Text style={{ flexDirection: "column" }}>
                      Semestes: {item.semester}
                    </Text>
                  </View>
                  <View style={styles.note}>
                    <Text style={{ fontWeight: "italic" }}>
                      {item.school_year}
                    </Text>
                  </View>
                </View>
                <View style={styles.note}>
                  <Text style={{ fontWeight: "italic" }}>
                    {item.description}
                  </Text>
                </View>

                {/* number student of a class */}
                <View style={styles.note}>
                  <Text>{numberStudent} student(s)</Text>
                </View>
                {/* number exam of a class */}
                <View style={styles.note}>
                  <Text>{numberExam} exam(s)</Text>
                </View>

                <View style={styles.manage}>
                  <Text style={{ fontsize: 12, color: theme.colors.label }}>
                    Manager
                  </Text>
                </View>
                <TouchableOpacity style={styles.btn} onPress={listExamOfClass}>
                  <View style={{ flexDirection: "column" }}>
                    <Image
                      source={require("../../assets/scan.png")}
                      resizeMode="contain"
                      style={{
                        width: 28,
                        height: 28,
                        backgroundColor: theme.colors.primary,
                        color: theme.colors.white,
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
                    <Text>Exams</Text>
                  </View>
                  <View style={{ flexDirection: "column" }}>
                    <Image
                      source={require("../../assets/Arrow.png")}
                      resizeMode="contain"
                      style={{
                        width: 20,
                        height: 20,
                        paddingLeft: "112%",
                        elevation: 0,
                        color: theme.colors.label,
                      }}
                    />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.btn}
                  onPress={() =>
                    navigation.navigate("StudentScreen", {
                      id: classId,
                    })
                  }
                >
                  <View style={{ flexDirection: "column" }}>
                    <Image
                      source={require("../../assets/person.png")}
                      resizeMode="contain"
                      style={{
                        width: 28,
                        height: 28,
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
                    <Text>Students</Text>
                  </View>
                  <View style={{ flexDirection: "column" }}>
                    <Image
                      source={require("../../assets/Arrow.png")}
                      resizeMode="contain"
                      style={{
                        width: 20,
                        height: 20,
                        paddingLeft: "109%",
                        elevation: 0,
                        color: theme.colors.label,
                      }}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>

      <View>
        <Button
          mode="outlined"
          style={styles.btn_edit}
          onPress={Edit}
          color={theme.colors.text}
        >
          Edit class
        </Button>
      </View>
      <View>
        <Button
          mode="outlined"
          style={styles.btn_delete}
          onPress={Delete}
          color={theme.colors.error}
        >
          Delete class
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default ClassDetail;

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
    fontSize: 20,
  },
  name_exam: {
    color: theme.colors.text,
    lexDirection: "row",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  note: {
    backgroundColor: theme.colors.background,
    paddingLeft: 30,
    marginTop: 5,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: "row",
    height: "auto",
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
