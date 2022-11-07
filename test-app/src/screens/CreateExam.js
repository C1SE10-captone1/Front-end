import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import React, { useState } from "react";
import Background from "../components/Background";
import BackButton from "../components/BackButton";
import TextInput from "../components/TextInput";
import Header from "../components/Header";
import Button from "../components/Button";
import Paragraph from "../components/Paragraph";
import { theme } from "../core/theme";
import SelectList from "react-native-dropdown-select-list";

import DateTimePickerModal from "react-native-modal-datetime-picker";

const CreateExam = ({ navigation }) => {
  const [name, setName] = useState({ value: "", error: "" });
  const [date, setDate] = useState({ value: "", error: "" });

  const [description, setDescription] = useState({ value: "", error: "" });
  const [error, setError] = useState(false);

  const [checkYear, setCheckYear] = useState(false);
  const [checkSemester, setCheckSemester] = useState(false);
  const [checkNameClass, setCheckNameClass] = useState(false);

  const [choiceQuestion, setChoiceQuestion] = useState("");
  const [scaleQuestion, setScaleQuestion] = useState("");

  const [isFocus, setIsFocus] = useState(false);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (datee) => {
    console.log(datee);
    var datestring =
      datee.getDate() +
      "/" +
      (datee.getMonth() + 1) +
      "/" +
      datee.getFullYear();
    // date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
    setDate(datee);
    console.log(date.value);
    // const datee1 = new Date(datestring);
    // console.log(datee1);
    hideDatePicker();
  };

  const options = [
    { key: 1, value: 10 },
    { key: 2, value: 20 },
  ];

  const scale = [
    { key: 1, value: 0.4 },
    { key: 2, value: 0.2 },
  ];

  const data = [
    { key: 1, value: "Năm học 2019-2020" },
    { key: 2, value: "Năm học 2020-2021" },
    { key: 3, value: "Năm học 2021-2022" },
    { key: 4, value: "Năm học 2022-2023" },
  ];

  const semeters = [
    { key: 1, value: "Học kỳ 1" },
    { key: 2, value: "Học kỳ 2" },
    { key: 3, value: "Học kỳ hè" },
  ];

  const Done = () => {
    console.log("click done");
    var value =
      name.value +
      "," +
      checkYear +
      "," +
      checkSemester +
      "," +
      checkNameClass +
      "," +
      choiceQuestion +
      "," +
      scaleQuestion +
      "," +
      date.value +
      "," +
      description.value;
    console.log(value);
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
      </Paragraph>
      <ScrollView>
        <Text style={styles.title}>Create Exam</Text>
        <View style={styles.container}>
          <View style={styles.box}>
            <TextInput
              keyboardType="text"
              label="Name Exam"
              returnKeyType="next"
              value={name.value}
              onChangeText={(text) => setName({ value: text, error: "" })}
              //   error={!!name.error}
              //   errorText={name.error}
            ></TextInput>
          </View>

          {/* choose school year and Semester */}
          <View style={styles.box}>
            <View
              style={{
                width: "58%",
                flexDirection: "column",
                marginTop: 5,
              }}
            >
              <SelectList
                data={data}
                value={checkYear}
                onFocus={() => setCheckYear(true)}
                onBlur={() => setCheckYear(true)}
                setSelected={setCheckYear}
                dropdownStyles={{ backgroundColor: "gray" }}
                dropdownItemStyles={{ marginHorizontal: 10 }}
                dropdownTextStyles={{ color: "white" }}
                placeholder="Choose school year"
                minWidth="100%"
                minHeight={100}
              />
              {/* <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? "Select city" : "..."}
                searchPlaceholder="Search..."
                value={city}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                  setCheckYear(item.value);
                  setCheckSemester(item.label);
                  setIsFocus(false);
                }}
              /> */}
            </View>

            {checkYear ? (
              <View
                style={{ width: "42%", flexDirection: "column", marginTop: 5 }}
              >
                <SelectList
                  style={{ fontSize: 3 }}
                  data={semeters}
                  setSelected={setCheckSemester}
                  setCheckSemester={true}
                  dropdownStyles={{ backgroundColor: "gray" }}
                  dropdownItemStyles={{ marginHorizontal: 10 }}
                  dropdownTextStyles={{ color: "white" }}
                  placeholder="Semester..."
                  minWidth="100%"
                  minHeight={100}
                />
              </View>
            ) : null}
          </View>

          {/*  choose class*/}
          {checkSemester ? (
            <View style={styles.box}>
              <View style={{ width: "100%", marginTop: 10 }}>
                <SelectList
                  data={data}
                  setSelected={setCheckNameClass}
                  dropdownStyles={{ backgroundColor: "gray" }}
                  dropdownItemStyles={{ marginHorizontal: 10 }}
                  dropdownTextStyles={{ color: "white" }}
                  placeholder="Choose class"
                  minWidth="100%"
                  minHeight={100}
                />
              </View>
            </View>
          ) : null}

          {/* select  number question and scale */}
          <View style={styles.box}>
            <View
              style={{
                width: "58%",
                flexDirection: "column",
                marginTop: 10,
              }}
            >
              <SelectList
                data={options}
                // value={checkYear}
                // onFocus={() => setCheckYear(true)}
                // onBlur={() => setCheckYear(true)}
                setSelected={setChoiceQuestion}
                dropdownStyles={{ backgroundColor: "gray" }}
                dropdownItemStyles={{ marginHorizontal: 10 }}
                dropdownTextStyles={{ color: "white" }}
                placeholder="Select question number"
                minWidth="100%"
                minHeight={100}
              />
            </View>

            <View
              style={{ width: "42%", flexDirection: "column", marginTop: 10 }}
            >
              <SelectList
                style={{ fontSize: 3 }}
                data={scale}
                setSelected={setScaleQuestion}
                setCheckSemester={true}
                dropdownStyles={{ backgroundColor: "gray" }}
                dropdownItemStyles={{ marginHorizontal: 10 }}
                dropdownTextStyles={{ color: "white" }}
                placeholder="Scale..."
                minWidth="100%"
                minHeight={100}
              />
            </View>
          </View>

          {/* select date */}
          <View
            style={{
              maxWidth: "70%",
              marginLeft: "10%",
              flexDirection: "row",
            }}
          >
            <View style={{ flexDirection: "column" }}>
              <TextInput
                label="Date"
                returnKeyType="next"
                value={date.value}
                placeholder={date.value}
                onChangeText={(text) => setDate({ value: text, error: "" })}
                //   error={!!description.error}
                //   errorText={description.error}
                keyboardType="text"
              ></TextInput>
            </View>

            <View style={{ flexDirection: "column" }}>
              <TouchableOpacity onPress={showDatePicker}>
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  // mode="datetime"
                  mode="date"
                  value={date}
                  // Hour="24Hours"
                  // onChange={() => {
                  //   setDate(date);
                  // }}
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                />
                <View
                  style={{
                    paddingTop: 28,
                    paddingLeft: 3,
                  }}
                >
                  <Image
                    source={require("../assets/schedule.png")}
                    resizeMode="contain"
                    style={{
                      width: 30,
                      height: 30,
                    }}
                  />
                </View>
              </TouchableOpacity>
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
              keyboardType="text"
              //   error={!!description.error}
              //   errorText={description.error}
            ></TextInput>
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
              Create Exam
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateExam;

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: {
    top: "2%",
    left: "22%",
    fontWeight: "bold",
    fontSize: 40,
    marginBottom: 30,
    color: theme.colors.primary,
  },
  box: {
    maxWidth: "80%",
    marginLeft: "10%",
    marginRight: "10%",
    flexDirection: "row",
  },

  btn_cancel: {
    marginTop: 20,
  },
  btn_done: {},
});
