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
import Header from "../components/Header";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";
import { theme } from "../core/theme";
import BackButton from "../components/BackButton";

const ClassDetail = ({ navigation }) => {
  const Edit = () => {
    console.log("click edit");
  };
  const Delete = () => {
    Alert.alert("Confirm delete!", "Are you sure delete Class " + "?", [
      {
        text: "Yes",
        onPress: () => {
          return;
        },
      },
      {
        text: "No",
      },
    ]);
  };

  const AddStudent = () => {};

  const ListExam = () => {
    console.log("List Exams");
  };

  return (
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
            minWidth: "40%",
          }}
        >
          <Image
            source={require("../assets/arrow_back.png")}
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
            Class
          </Text>
        </View>
      </View>
      <View style={styles.controller}>
        <View style={styles.content}>
          <Text style={styles.name_class}>CMU-SE 450 AIS</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            backgroundColor: theme.colors.background,
            marginTop: 5,
          }}
        >
          <View style={styles.note}>
            <Text>Semestes 1</Text>
          </View>
          <View style={styles.note}>
            <Text style={{ fontWeight: "italic" }}>2022-2023</Text>
          </View>
        </View>
        <View style={styles.note}>
          <Text style={{ fontWeight: "italic" }}>R.412. Quang Trung</Text>
        </View>
        <View style={styles.note}>
          <Text>89 student(s)</Text>
        </View>
        <View style={styles.note}>
          <Text>1 exam(s)</Text>
        </View>

        <View style={styles.manage}>
          <Text style={{ fontsize: 12, color: theme.colors.label }}>
            Manager
          </Text>
        </View>
        <TouchableOpacity style={styles.btn} onPress={ListExam}>
          <View style={{ flexDirection: "column" }}>
            <Image
              source={require("../assets/scan.png")}
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
            style={{ flexDirection: "column", paddingLeft: 20, paddingTop: 3 }}
          >
            <Text>Exams</Text>
          </View>
          <View style={{ flexDirection: "column" }}>
            <Image
              source={require("../assets/Arrow.png")}
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
          onPress={() => navigation.navigate("StudentScreen")}
        >
          <View style={{ flexDirection: "column" }}>
            <Image
              source={require("../assets/person.png")}
              resizeMode="contain"
              style={{
                width: 28,
                height: 28,
                backgroundColor: theme.colors.primary,
              }}
            />
          </View>
          <View
            style={{ flexDirection: "column", paddingLeft: 20, paddingTop: 3 }}
          >
            <Text>Students</Text>
          </View>
          <View style={{ flexDirection: "column" }}>
            <Image
              source={require("../assets/Arrow.png")}
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
      {/* styles.btn */}
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
