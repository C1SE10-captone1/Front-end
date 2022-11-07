import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import BackButton from "../components/BackButton";
import Button from "../components/Button";
import Paragraph from "../components/Paragraph";
import Header from "../components/Header";
import { supabase } from "../utils/supabase-service";
import { theme } from "../core/theme";

const StudentScreen = ({ navigation }) => {
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
            minWidth: "35%",
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
            Student
          </Text>
        </View>
      </View>
      <ScrollView style={{ width: "100%" }}>
        <TouchableOpacity>
          <View style={styles.row}>
            <View style={{ flexDirection: "column" }}>
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={require("../assets/person.png")}
                  resizeMode="contain"
                  style={{
                    width: 70,
                    height: 70,
                  }}
                />
              </View>
              <StatusBar style="auto" />
            </View>
            <View style={{ flexDirection: "column", paddingLeft: 30 }}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.row_title}>Nguyen Van A</Text>
              </View>

              {/* <View style={{ flexDirection: "row" }}>
                <View style={{ flexDirection: "column" }}>
                  <View style={{ flexDirection: "row" }}>
                    <Image
                      source={require("../assets/person.png")}
                      resizeMode="contain"
                      style={{
                        width: 20,
                        height: 20,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    />
                    <Text>person</Text>
                  </View>
                </View>

                <View style={{ flexDirection: "column", paddingLeft: 50 }}>
                  <View style={{ flexDirection: "row" }}>
                    <Image
                      source={require("../assets/scan.png")}
                      resizeMode="contain"
                      style={{
                        width: 15,
                        height: 15,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    />
                    <Text>scan</Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "column",
                    position: "absolute",
                    // right: 10,
                    left: "170%",
                    elevation: 0,
                  }}
                >
                  <Image
                    source={require("../assets/Arrow.png")}
                    resizeMode="contain"
                    style={{
                      width: 12,
                      height: 12,
                      // paddingLeft: 100,
                    }}
                  />
                </View>
              </View> */}
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.row}>
            <View style={{ flexDirection: "column" }}>
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={require("../assets/person.png")}
                  resizeMode="contain"
                  style={{
                    width: 70,
                    height: 70,
                  }}
                />
              </View>
              <StatusBar style="auto" />
            </View>
            <View style={{ flexDirection: "column", paddingLeft: 30 }}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.row_title}>Nguyen Van B</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.row}>
            <View style={{ flexDirection: "column" }}>
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={require("../assets/person.png")}
                  resizeMode="contain"
                  style={{
                    width: 70,
                    height: 70,
                  }}
                />
              </View>
              <StatusBar style="auto" />
            </View>
            <View style={{ flexDirection: "column", paddingLeft: 30 }}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.row_title}>Nguyen Van E</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.row}>
            <View style={{ flexDirection: "column" }}>
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={require("../assets/person.png")}
                  resizeMode="contain"
                  style={{
                    width: 70,
                    height: 70,
                  }}
                />
              </View>
              <StatusBar style="auto" />
            </View>
            <View style={{ flexDirection: "column", paddingLeft: 30 }}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.row_title}>Nguyen Van C</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.row}>
            <View style={{ flexDirection: "column" }}>
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={require("../assets/person.png")}
                  resizeMode="contain"
                  style={{
                    width: 70,
                    height: 70,
                  }}
                />
              </View>
              <StatusBar style="auto" />
            </View>
            <View style={{ flexDirection: "column", paddingLeft: 30 }}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.row_title}>Nguyen Van D</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
      <Button
        mode="contained"
        style={styles.btn_new}
        onPress={() => navigation.navigate("CreateStudent")}
      >
        New Student
      </Button>
    </SafeAreaView>
  );
};

export default StudentScreen;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    background: "#F7F7F7",
  },
  row_title: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 24,
    paddingTop: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignContent: "center",
    borderColor: 1,
    marginBottom: 10,
    backgroundColor: "#ffffff",
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    height: 70,
    borderRadius: 10,
    width: "100%",
    marginTop: 3,
  },
  btn_new: {
    // position: "absolute",
    width: "70%",
    bottom: 5,
    left: "15%",
    elevation: 0,
    borderRadius: 15,
  },
});
