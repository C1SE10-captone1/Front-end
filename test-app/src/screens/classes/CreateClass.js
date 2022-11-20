import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState, useRef } from "react";
import BackButton from "../../components/BackButton";
import TextInput from "../../components/TextInput";
import Paragraph from "../../components/Paragraph";
import Button from "../../components/Button";
import { theme } from "../../core/theme";
import SelectList from "react-native-dropdown-select-list";
import { Dropdown } from "react-native-element-dropdown";
import { supabase } from "../../utils/supabase-service";

const CreateClass = ({ navigation }) => {
  const ref = useRef(null);
  const [name, setName] = useState({ value: "", error: "" });
  const [classCode, setClassCode] = useState({ value: "", error: "" });
  const [semetes, setSemetes] = useState();
  const [schoolYear, setSchoolYear] = useState();

  const [description, setDescription] = useState({ value: "", error: "" });

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const currentUser = supabase.auth.user();

  const Done = async () => {
    var check = true;
    let { data: classes, err } = await supabase.from("classes").select("*");
    for (let i = 0; i < classes.length; i++) {
      if (
        classes[i].class_code === classCode.value &&
        classes[i].school_year === school_year[schoolYear - 1].label
      ) {
        check = false;
        Alert.alert("Create Exam failed!", "Class code already exists. ", [
          {
            text: "Back",
            onPress: () => {
              navigation.goBack();
            },
          },
        ]);
        break;
      } else if (classes[i].name === name.value) {
        check = false;
        Alert.alert("Create Exam failed!", "Class name already exists. ", [
          {
            text: "Back",
            onPress: () => {
              navigation.goBack();
            },
          },
        ]);
        break;
      }
    }
    console.log("click done");
    if (check === true) {
      const { data, error } = await supabase.from("classes").insert([
        {
          name: name.value,
          class_code: classCode.value,
          school_year: school_year[schoolYear - 1].label,
          semester: semeters[semetes - 1].label,
          description: description.value,
          uid: currentUser.id,
        },
      ]);
      console.log(error);
      if (error !== null) {
        Alert.alert("Failed!", "Create Exam failed.", [
          {
            text: "Back",
            onPress: () => {
              navigation.goBack();
            },
          },
        ]);
        return;
      } else {
        Alert.alert("Success", "Create Exam successful!", [
          {
            text: "Back list class",
            onPress: () => {
              navigation.pop();
            },
          },
          {
            text: "OK",
          },
        ]);
        return;
      }
    }
  };

  const school_year = [
    { value: 1, label: "2019-2020" },
    { value: 2, label: "2020-2021" },
    { value: 3, label: "2021-2022" },
    { value: 4, label: "2022-2023" },
  ];

  const semeters = [
    { value: 1, label: "I" },
    { value: 2, label: "II" },
    { value: 3, label: "Vacation" },
  ];

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

  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
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
              error={!!name.error}
              errorText={name.error}
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
              error={!!name.error}
              errorText={name.error}
            ></TextInput>
          </View>
          <View>
            <View style={styles.box}>
              <View
                style={{
                  width: "58%",
                  flexDirection: "column",
                  marginTop: 8,
                }}
              >
                <Dropdown
                  // disable={true}
                  ref={ref}
                  statusBarIsTranslucent={true}
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={school_year}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Select school year..."
                  searchPlaceholder="Search..."
                  value={schoolYear}
                  onChange={(item) => {
                    setSchoolYear(item.value);
                  }}
                  renderItem={renderItem}
                />
              </View>

              <View
                style={{ width: "42%", flexDirection: "column", marginTop: 8 }}
              >
                <Dropdown
                  ref={ref}
                  statusBarIsTranslucent={true}
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={semeters}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Semeters"
                  searchPlaceholder="Search..."
                  value={semetes}
                  onChange={(item) => {
                    setSemetes(item.value);
                  }}
                  renderItem={renderItem}
                />
              </View>
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
    marginTop: 10,
    marginLeft: "10%",
    marginRight: "10%",
    flexDirection: "row",
  },
  box_child: {
    maxWidth: "44%",
    flexDirection: "column",
  },
  btn_cancel: {
    marginTop: 40,
  },
  btn_done: {},
  dropdown: {
    // margin: 16,
    height: 50,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
});
