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
import React, { useEffect, useState, useRef } from "react";
import BackButton from "../../components/BackButton";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import Paragraph from "../../components/Paragraph";
import { theme } from "../../core/theme";
import SelectList from "react-native-dropdown-select-list";
import { supabase } from "../../utils/supabase-service";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Dropdown } from "react-native-element-dropdown";
let colectionClass = {
  id: "",
  name: "",
  uid: "",
};
const CreateExam = ({ navigation }) => {
  const [name, setName] = useState({ value: "", error: "" });
  const [date1, setDate1] = useState("");
  const [description, setDescription] = useState({ value: "", error: "" });
  const [error, setError] = useState(false);
  const [checkYear, setCheckYear] = useState();
  const [checkSemester, setCheckSemester] = useState();
  const [checkClass, setCheckClass] = useState();

  const [choiceQuestion, setChoiceQuestion] = useState("");
  const [scaleQuestion, setScaleQuestion] = useState("");

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [classe, setClasses] = useState(colectionClass);
  const currentUser = supabase.auth.user();
  const [disable, setDisable] = useState(false);
  const ref = useRef(null);

  const loadClassOfUser = async () => {
    let { data: classes, error } = await supabase
      .from("classes")
      .select("*")
      .eq("uid", currentUser.id)
      .eq("is_delete", false);
    classes.filter((c) => setClasses(c.id, c.name, c.uid));
    console.log("class-2: ", classe);
  };
  useEffect(() => {
    // loadClassOfUser().then();
  }, [navigation]);

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
    setDate1(datee);
    console.log("date: ", date1);
    // const datee1 = new Date(datestring);
    // console.log(datee1);
    hideDatePicker();
  };

  const options = [
    { value: 1, label: "10" },
    { value: 2, label: "20" },
  ];

  const scale = [
    { value: 1, label: "0.4" },
    { value: 2, label: "0.2" },
  ];

  const data = [
    { value: 1, label: "Năm học 2019-2020" },
    { value: 2, label: "Năm học 2020-2021" },
    { value: 3, label: "Năm học 2021-2022" },
    { value: 4, label: "Năm học 2022-2023" },
  ];
  const semeters = [
    { value: 1, label: "Học kỳ 1" },
    { value: 2, label: "Học kỳ 2" },
    { value: 3, label: "Học kỳ hè" },
  ];

  const data2 = [
    { label: "Item 1", value: "1" },
    { label: "Item 2", value: "2" },
    { label: "Item 3", value: "3" },
    { label: "Item 4", value: "4" },
    { label: "Item 5", value: "5" },
    { label: "Item 6", value: "6" },
    { label: "Item 7", value: "7" },
    { label: "Item 8", value: "8" },
  ];

  const Done = async () => {
    console.log("click done");
    var value =
      name.value +
      "," +
      checkYear +
      "," +
      checkSemester +
      "," +
      checkClass +
      "," +
      choiceQuestion +
      "," +
      scaleQuestion +
      "," +
      date1 +
      "," +
      description.value;
    console.log(value);

    // const { error } = await supabase.from("exams").insert([
    //   {
    //     name: name,
    //     options: choiceQuestion,
    //     scale: scaleQuestion,
    //     date: date,
    //     description: description,
    //     class_id: "",
    //   },
    // ]);
    // if (error) {
    //   Alert.alert("Failed!", "Create Exam failed!", [
    //     {
    //       text: "Back",
    //     },
    //   ]);
    // } else {
    //   Alert.alert("Create Exam successful!", [
    //     {
    //       text: "OK",
    //       onPress: () => {
    //         navigation.goBack();
    //       },
    //     },
    //     {
    //       text: "No",
    //     },
    //   ]);
    // }
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
      </Paragraph>
      <ScrollView style={{}}>
        <Text style={styles.title}>Create Exam</Text>
        <View style={styles.container}>
          {/* enter name exam */}
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
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select school year..."
                searchPlaceholder="Search..."
                value={checkYear}
                onChange={(item) => {
                  setCheckYear(item.value);
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
                value={checkSemester}
                onChange={(item) => {
                  setCheckSemester(item.value);
                }}
                renderItem={renderItem}
              />
            </View>
          </View>

          {/*  choose class*/}
          <View style={styles.box}>
            <View style={{ width: "100%", marginTop: 10 }}>
              <Dropdown
                ref={ref}
                statusBarIsTranslucent={true}
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data2}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select class"
                searchPlaceholder="Search..."
                value={checkClass}
                onChange={(item) => {
                  setCheckClass(item.value);
                }}
                renderItem={renderItem}
              />
            </View>
          </View>

          {/* select  number question and scale */}
          <View style={styles.box}>
            <View
              style={{
                width: "58%",
                flexDirection: "column",
                marginTop: 10,
              }}
            >
              <Dropdown
                ref={ref}
                statusBarIsTranslucent={true}
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={options}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Choice questions"
                searchPlaceholder="Search..."
                value={choiceQuestion}
                onChange={(item) => {
                  setChoiceQuestion(item.value);
                }}
                renderItem={renderItem}
              />
            </View>

            <View
              style={{ width: "42%", flexDirection: "column", marginTop: 10 }}
            >
              <Dropdown
                ref={ref}
                statusBarIsTranslucent={true}
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={scale}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Scale"
                searchPlaceholder="Search..."
                value={scaleQuestion}
                onChange={(item) => {
                  setScaleQuestion(item.value);
                }}
                renderItem={renderItem}
              />
            </View>
          </View>

          {/* select date */}
          <View
            style={{
              maxWidth: "70%",
              marginLeft: "10%",
              flexDirection: "row",
              marginTop: 5,
              marginBottom: 5,
            }}
          >
            {/* <Text>{date}</Text> */}
            <View style={{ flexDirection: "column" }}>
              <TextInput
                label="Date"
                returnKeyType="next"
                value={date1}
                onChangeText={(date) => setDate1(date)}
                //   error={!!description.error}
                //   errorText={description.error}
                keyboardType="datetime"
              ></TextInput>
            </View>

            <View style={{ flexDirection: "column" }}>
              <TouchableOpacity onPress={showDatePicker}>
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  // mode="datetime"
                  mode="date"
                  value={date1}
                  onChange={(text) => setDate1(text)}
                  onBlur={(text) => setDate1(text)}
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
                    source={require("../../assets/schedule.png")}
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
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
