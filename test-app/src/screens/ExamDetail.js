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
import { StatusBar } from "expo-status-bar";

const ExamDetail = ({ navigation }) => {
  const Edit = () => {
    console.log("click edit");
  };
  const Delete = () => {
    Alert.alert("Confirm delete!", "Are you sure delete Exam " + "?", [
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
            Exam
          </Text>
        </View>
      </View>

      <View style={styles.controller}>
        <View style={styles.content}>
          <Text style={styles.name_class}>CMU-SE 450 AIS</Text>
          <Text style={styles.name_exam}>FINAL exam</Text>
        </View>
        <View style={styles.date}>
          <Text>Monday, May 14</Text>
        </View>
        <View style={styles.note}>
          <Text style={{ fontWeight: "italic" }}>R.412. Quang Trung</Text>
        </View>

        <View style={styles.manage}>
          <Text style={{ fontsize: 12, color: theme.colors.label }}>
            Manager
          </Text>
        </View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("AnswerKey")}
        >
          <View style={{ flexDirection: "column" }}>
            <Image
              source={require("../assets/Jackdaw.png")}
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
            style={{ flexDirection: "column", paddingLeft: 20, paddingTop: 3 }}
          >
            <Text>Enter answer of exams</Text>
          </View>
          <View style={{ flexDirection: "column" }}>
            <Image
              source={require("../assets/Arrow.png")}
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
          onPress={() => navigation.navigate("AnswerStudent")}
        >
          <View style={{ flexDirection: "column" }}>
            <Image
              source={require("../assets/Instagram.png")}
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
            style={{ flexDirection: "column", paddingLeft: 20, paddingTop: 3 }}
          >
            <Text>Enter answer of students</Text>
          </View>
          <View style={{ flexDirection: "column" }}>
            <Image
              source={require("../assets/Arrow.png")}
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
          style={styles.btn}
          onPress={() => navigation.navigate("Result")}
        >
          <View style={{ flexDirection: "column" }}>
            <Image
              source={require("../assets/Textbook.png")}
              resizeMode="contain"
              style={{
                width: 28,
                height: 28,
                elevation: 0,
                borderRadius: 7,
                backgroundColor: theme.colors.primary,
              }}
            />
          </View>
          <View
            style={{ flexDirection: "column", paddingLeft: 20, paddingTop: 3 }}
          >
            <Text>Results</Text>
          </View>
          <View style={{ flexDirection: "column" }}>
            <Image
              source={require("../assets/Arrow.png")}
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
          style={styles.btn}
          onPress={() => navigation.navigate("AnalystExam")}
        >
          <View style={{ flexDirection: "column" }}>
            <Image
              source={require("../assets/Group.png")}
              resizeMode="contain"
              style={{
                width: 28,
                height: 28,
                elevation: 0,
                borderRadius: 7,
                backgroundColor: theme.colors.primary,
              }}
            />
          </View>
          <View
            style={{ flexDirection: "column", paddingLeft: 20, paddingTop: 3 }}
          >
            <Text>Exam analysis</Text>
          </View>
          <View style={{ flexDirection: "column" }}>
            <Image
              source={require("../assets/Arrow.png")}
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
      {/* styles.btn */}
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
      {/* </ScrollView> */}
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
