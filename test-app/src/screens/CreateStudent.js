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
import Background from "../components/Background";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";
import { theme } from "../core/theme";
import BackButton from "../components/BackButton";
import TextInput from "../components/TextInput";

const CreateStudent = ({ navigation }) => {
  const [name, setName] = useState({ value: "", error: "" });
  const [studentCode, setStudentCode] = useState({ value: "", error: "" });

  const Done = () => {
    console.log("click done");
  };

  const Cancel = () => {
    Alert.alert(
      "Are you sure cancel",
      "Are you sure you want to reset this text box?",
      [
        {
          text: "Yes",
          onPress: () => {
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
    <SafeAreaView style={{ flex: 1 }}>
      <Paragraph style={{ paddingTop: 30, paddingLeft: 20 }}>
        <BackButton goBack={navigation.goBack} />
        {/* <Header>Student</Header> */}
      </Paragraph>
      <Background>
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
                //   error={!!name.error}
                //   errorText={name.error}
              ></TextInput>
            </View>
            {/* input name class  */}
            <View style={styles.box}>
              <TextInput
                keyboardType="text"
                label="Name Student"
                returnKeyType="next"
                value={name.value}
                onChangeText={(text) => setName({ value: text, error: "" })}
                //   error={!!name.error}
                //   errorText={name.error}
              ></TextInput>
            </View>
          </View>

          {/* button handle */}
          <View style={{}}>
            <Button
              mode="outlined"
              style={{ marginTop: 40 }}
              color={theme.colors.yelow}
              onPress={chooseFile}
            >
              Import file student(s)
            </Button>
            <Button mode="outlined" style={styles.btn_cancel} onPress={Cancel}>
              Cancel
            </Button>
            <Button
              mode="outlined"
              style={styles.btn_done}
              color={"#000000"}
              onPress={Done}
            >
              Create Student
            </Button>
          </View>
        </ScrollView>
      </Background>
    </SafeAreaView>
  );
};

export default CreateStudent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    top: "2%",
    // left: "21%",
    fontWeight: "bold",
    fontSize: 40,
    marginBottom: 30,
    color: theme.colors.primary,
  },
  box: {
    maxWidth: "100%",
    // marginLeft: "10%",
    // marginRight: "10%",
  },
  box_child: {
    maxWidth: "44%",
    flexDirection: "column",
  },
  btn_cancel: {
    marginTop: 10,
  },
  btn_done: {},
});
