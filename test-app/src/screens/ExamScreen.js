import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import { theme } from "../core/theme";

const ExamScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ width: "100%" }}>
        <View style={styles.box_title}>
          <Text style={styles.date}>Monday, May 14</Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("ExamDetail")}>
          <View style={styles.container}>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                backgroundColor: theme.colors.background,
              }}
            >
              <View style={styles.box}>
                <View>
                  <Image
                    source={require("../assets/ico_exam.png")}
                    resizeMode="contain"
                    style={{
                      width: 75,
                      height: 75,
                    }}
                  />
                </View>
              </View>
              <View style={styles.box}>
                <View style={{ flexDirection: "column" }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.name_class}>CMU-SE 450 AIS</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.name_exam}>FINAL EXAM</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.note}>R.412. Quang Trung</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("ExamDetail")}>
          <View style={styles.container}>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                backgroundColor: theme.colors.background,
              }}
            >
              <View style={styles.box}>
                <View>
                  <Image
                    source={require("../assets/ico_exam.png")}
                    resizeMode="contain"
                    style={{
                      width: 75,
                      height: 75,
                    }}
                  />
                </View>
              </View>
              <View style={styles.box}>
                <View style={{ flexDirection: "column" }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.name_class}>CMU-SE 450 AIS</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.name_exam}>FINAL EXAM</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.note}>R.412. Quang Trung</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("ExamDetail")}>
          <View style={styles.container}>
            <View style={styles.box_title}>
              <Text style={styles.date}>Monday, May 14</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                width: "100%",
                backgroundColor: theme.colors.background,
              }}
            >
              <View style={styles.box}>
                <View>
                  <Image
                    source={require("../assets/ico_exam.png")}
                    resizeMode="contain"
                    style={{
                      width: 75,
                      height: 75,
                    }}
                  />
                </View>
              </View>
              <View style={styles.box}>
                <View style={{ flexDirection: "column" }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.name_class}>CMU-SE 450 AIS</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.name_exam}>FINAL EXAM</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.note}>R.412. Quang Trung</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("ExamDetail")}>
          <View style={styles.container}>
            <View style={styles.box_title}>
              <Text style={styles.date}>Monday, May 14</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                width: "100%",
                backgroundColor: theme.colors.background,
              }}
            >
              <View style={styles.box}>
                <View>
                  <Image
                    source={require("../assets/ico_exam.png")}
                    resizeMode="contain"
                    style={{
                      width: 75,
                      height: 75,
                    }}
                  />
                </View>
              </View>
              <View style={styles.box}>
                <View style={{ flexDirection: "column" }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.name_class}>CMU-SE 450 AIS</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.name_exam}>FINAL EXAM</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.note}>R.412. Quang Trung</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("ExamDetail")}>
          <View style={styles.container}>
            <View style={styles.box_title}>
              <Text style={styles.date}>Monday, May 14</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                width: "100%",
                backgroundColor: theme.colors.background,
              }}
            >
              <View style={styles.box}>
                <View>
                  <Image
                    source={require("../assets/ico_exam.png")}
                    resizeMode="contain"
                    style={{
                      width: 75,
                      height: 75,
                    }}
                  />
                </View>
              </View>
              <View style={styles.box}>
                <View style={{ flexDirection: "column" }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.name_class}>CMU-SE 450 AIS</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.name_exam}>FINAL EXAM</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.note}>R.412. Quang Trung</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("ExamDetail")}>
          <View style={styles.container}>
            <View style={styles.box_title}>
              <Text style={styles.date}>Monday, May 14</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                width: "100%",
                backgroundColor: theme.colors.background,
              }}
            >
              <View style={styles.box}>
                <View>
                  <Image
                    source={require("../assets/ico_exam.png")}
                    resizeMode="contain"
                    style={{
                      width: 75,
                      height: 75,
                    }}
                  />
                </View>
              </View>
              <View style={styles.box}>
                <View style={{ flexDirection: "column" }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.name_class}>CMU-SE 450 AIS</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.name_exam}>FINAL EXAM</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.note}>R.412. Quang Trung</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("ExamDetail")}>
          <View style={styles.container}>
            <View style={styles.box_title}>
              <Text style={styles.date}>Monday, May 14</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                width: "100%",
                backgroundColor: theme.colors.background,
              }}
            >
              <View style={styles.box}>
                <View>
                  <Image
                    source={require("../assets/ico_exam.png")}
                    resizeMode="contain"
                    style={{
                      width: 75,
                      height: 75,
                    }}
                  />
                </View>
              </View>
              <View style={styles.box}>
                <View style={{ flexDirection: "column" }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.name_class}>CMU-SE 450 AIS</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.name_exam}>FINAL EXAM</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.note}>R.412. Quang Trung</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>

      <View>
        <Button
          mode="contained"
          style={styles.btn}
          onPress={() => navigation.navigate("CreateExam")}
        >
          Create Exam
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default ExamScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    flexDirection: "column",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
  },
  box_title: {
    marginTop: 5,
    marginLeft: 10,
    flexDirection: "row",
  },
  name_class: {
    color: theme.colors.primary,
    fontWeight: "bold",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  name_exam: {
    color: theme.colors.text,
    fontWeight: "bold",
    letterSpacing: 1,
    paddingTop: 5,
    textTransform: "uppercase",
  },
  note: {
    color: theme.colors.label,
    fontWeight: "italic",
    letterSpacing: 2,
    paddingTop: 5,
    fontSize: 12,
  },
  date: {
    color: theme.colors.label,
    fontWeight: "italic",
    // marginLeft: -70,
    letterSpacing: 3,
  },
  btn: {
    // position: "absolute",
    width: "70%",
    bottom: 5,
    left: "15%",
    elevation: 0,
    borderRadius: 15,
  },
});
