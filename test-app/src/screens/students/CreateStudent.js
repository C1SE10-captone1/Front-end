import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Alert,
  // Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import Paragraph from "../../components/Paragraph";
import Button from "../../components/Button";
import { theme } from "../../core/theme";
import BackButton from "../../components/BackButton";
import TextInput from "../../components/TextInput";
import { supabase } from "../../utils/supabase-service";
import { studentNameValidator } from "../../helpers/studentNameValidator";
import { studentCodeValidator } from "../../helpers/studentCodeValidator";

const CreateStudent = ({ route, navigation }) => {
  const classId = route.params.id;
  const currentUser = supabase.auth.user();
  const [name, setName] = useState({ value: "", error: "" });
  const [studentCode, setStudentCode] = useState({ value: "", error: "" });

  const [students, setStudents] = useState([]);

  const [loading, setLoading] = useState(false);

  const Done = async () => {
    setLoading(true);
    var check = true;
    const checkStudentCode = studentCodeValidator(studentCode.value);
    const checkName = studentNameValidator(name.value);

    if (checkStudentCode || checkName) {
      var check = false;
      setLoading(false);
      setName({ value: name.value, error: checkName });
      setStudentCode({ value: studentCode.value, error: checkStudentCode });
      return;
    }
    let { data: students, error } = await supabase
      .from("students")
      .select(`*`)
      .eq("class_id", classId)
      .eq("is_delete", false);

    for (let i = 0; i < students.length; i++) {
      if (students[i].student_code === studentCode.value) {
        check = false;
        Alert.alert("Create Student failed!", "Student code already exists. ", [
          {
            text: "Back",
            onPress: () => {},
          },
        ]);
        setLoading(false);
        break;
      }
    }
    if (check) {
      setLoading(false);
      const { err } = await supabase.from("students").insert([
        {
          full_name: name.value,
          student_code: studentCode.value,
          class_id: classId,
        },
      ]);
      if (err) {
        Alert.alert("Failed!", "Create Student failed.", [
          {
            text: "Back",
            onPress: () => {
              navigation.goBack();
            },
          },
        ]);
        setLoading(false);
        return;
      } else {
        setLoading(false);
        Alert.alert("Success", "Create Student successful!", [
          {
            text: "Back students list ",
            onPress: () => {
              navigation.pop();
            },
          },
          {
            text: "OK",
            onPress: () => {
              setName({ value: "", error: "" });
              setStudentCode({ value: "", error: "" });
              setLoading(false);
              return;
            },
          },
        ]);
        return;
      }
    } else {
      setLoading(false);
      return;
    }
  };

  const Cancel = () => {
    Alert.alert(
      "Are you sure cancel",
      "Are you sure you want to reset this text box?",
      [
        {
          text: "Yes",
          onPress: () => {
            setName({ value: "", error: "" });
            setStudentCode({ value: "", error: "" });
            setLoading(false);
            return;
          },
        },
        {
          text: "No",
        },
      ]
    );
  };

  const chooseFile = () => {};
  return (
    <SafeAreaView>
      <Paragraph style={{ paddingTop: 30, paddingLeft: 20 }}>
        <BackButton goBack={navigation.goBack} />
        {/* <Header>Class</Header> */}
      </Paragraph>
      <ScrollView>
        <Text style={styles.title}>Create Student</Text>
        <View style={styles.container}>
          {/* input name class code */}
          <View style={styles.box}>
            <TextInput
              keyboardType="text"
              label="Student Code"
              returnKeyType="next"
              value={studentCode.value}
              onChangeText={(text) =>
                setStudentCode({ value: text, error: "" })
              }
              error={!!studentCode.error}
              errorText={studentCode.error}
            ></TextInput>
          </View>
          {/* input name class  */}
          <View style={styles.box}>
            <TextInput
              keyboardType="text"
              label="Student Name"
              returnKeyType="done"
              value={name.value}
              onChangeText={(text) => setName({ value: text, error: "" })}
              error={!!name.error}
              errorText={name.error}
            ></TextInput>
          </View>
        </View>

        {/* button handle */}
        <View style={{}}>
          <Button
            mode="outlined"
            style={{ marginTop: 50 }}
            color={theme.colors.yelow}
            onPress={chooseFile}
          >
            Import file student(s)
          </Button>
          <Button mode="outlined" onPress={Cancel}>
            Cancel
          </Button>
          <Button disabled={loading} mode="contained" onPress={Done}>
            {loading ? "Loading" : "Create Student"}
          </Button>
        </View>
        {/* </Background> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateStudent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    // left: "3%",
    fontWeight: "bold",
    fontSize: 40,
    marginBottom: 30,
    // margin: "20%",
    marginHorizontal: "12%",
    marginVertical: "15%",
    color: theme.colors.primary,
  },
  box: {
    maxWidth: "80%",
    marginTop: 20,
    marginLeft: "10%",
    marginRight: "10%",
    flexDirection: "row",
  },
});
