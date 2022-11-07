import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import BackButton from "../components/BackButton";
import TextInput from "../components/TextInput";
import Header from "../components/Header";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";
import { theme } from "../core/theme";

const CreateClass = ({ navigation }) => {
  const [name, setName] = useState({ value: "", error: "" });
  const [classCode, setClassCode] = useState({ value: "", error: "" });
  const [semetes, setSemetes] = useState({ value: "", error: "" });
  const [schoolYear, setSchoolYear] = useState({ value: "", error: "" });
  const [description, setDescription] = useState({ value: "", error: "" });

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
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
            setName("");
            setDescription("");
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
    <SafeAreaView>
      <Paragraph style={{ paddingTop: 30, paddingLeft: 20 }}>
        <BackButton goBack={navigation.goBack} />
        {/* <Header>Class</Header> */}
      </Paragraph>
      <ScrollView>
        <Text style={styles.title}>Create Class</Text>
        <View style={styles.container}>
          {/* input name class code */}
          <View style={styles.box}>
            <TextInput
              keyboardType="text"
              label="Class Code"
              returnKeyType="next"
              value={classCode.value}
              onChangeText={(text) => setClassCode({ value: text, error: "" })}
              //   error={!!name.error}
              //   errorText={name.error}
            ></TextInput>
          </View>
          {/* input name class  */}
          <View style={styles.box}>
            <TextInput
              keyboardType="text"
              label="Name Class"
              returnKeyType="next"
              value={name.value}
              onChangeText={(text) => setName({ value: text, error: "" })}
              //   error={!!name.error}
              //   errorText={name.error}
            ></TextInput>
          </View>
          <View
            style={{
              flexDirection: "row",
              paddingLeft: "10%",
              paddRight: "10%",
            }}
          >
            <View style={styles.box_child}>
              <TextInput
                keyboardType="text"
                label="School Year"
                returnKeyType="next"
                value={schoolYear.value}
                onChangeText={(text) =>
                  setSchoolYear({ value: text, error: "" })
                }
                //   error={!!name.error}
                //   errorText={name.error}
              ></TextInput>
            </View>
            <View style={styles.box_child}>
              <TextInput
                keyboardType="text"
                label="Semestes"
                returnKeyType="next"
                value={semetes.value}
                onChangeText={(text) => setSemetes({ value: text, error: "" })}
                //   error={!!name.error}
                //   errorText={name.error}
              ></TextInput>
            </View>
          </View>

          {/* input description */}
          <View style={styles.box}>
            <TextInput
              label="Description"
              returnKeyType="done"
              value={description.value}
              onChangeText={(text) =>
                setDescription({ value: text, error: "" })
              }
              //   error={!!description.error}
              //   errorText={description.error}
              keyboardType="text"
            ></TextInput>
          </View>
        </View>

        {/* button handle */}
        <View>
          <Button mode="outlined" style={styles.btn_cancel} onPress={Cancel}>
            Cancel
          </Button>
          <Button
            mode="outlined"
            style={styles.btn_done}
            color={"#000000"}
            onPress={Done}
          >
            Create Class
          </Button>
        </View>
        {/* </Background> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateClass;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    top: "2%",
    left: "21%",
    fontWeight: "bold",
    fontSize: 40,
    marginBottom: 30,
    color: theme.colors.primary,
  },
  box: {
    maxWidth: "80%",
    marginLeft: "10%",
    marginRight: "10%",
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
