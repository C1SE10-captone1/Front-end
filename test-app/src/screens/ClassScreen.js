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
import Button from "../components/Button";
import { supabase } from "../utils/supabase-service";
import { theme } from "../core/theme";

// const navigate = useNavigation();

const ClassScreen = ({ navigation }) => {
  async function name() {
    const { data, err } = await supabase.from("classes").select("*");
    console.log("clicked");
    console.log("err ne", err);
    console.log("data", data);
    // return data;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <TouchableOpacity onPress={() => navigation.navigate("ClassDetail")}>
          <View style={styles.row}>
            <View style={{ flexDirection: "column" }}>
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={require("../assets/img_class.png")}
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
                <Text style={styles.row_title}>Toán Cao Cấp 1</Text>
              </View>

              <View style={{ flexDirection: "row" }}>
                <View style={{ flexDirection: "column" }}>
                  <View style={{ flexDirection: "row" }}>
                    {/* <Image
                      source={require("../assets/person.png")}
                      resizeMode="contain"
                      style={{
                        width: 20,
                        height: 20,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    /> */}
                    <Text>Semestes 1</Text>
                  </View>
                </View>

                <View style={{ flexDirection: "column", paddingLeft: 50 }}>
                  <View style={{ flexDirection: "row" }}>
                    {/* <Image
                      source={require("../assets/scan.png")}
                      resizeMode="contain"
                      style={{
                        width: 15,
                        height: 15,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    /> */}
                    <Text>2022-2023</Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "column",
                    // position: "absolute",
                    // right: 10,
                    // left: "170%",
                    elevation: 0,
                  }}
                >
                  <Image
                    source={require("../assets/Arrow.png")}
                    resizeMode="contain"
                    style={{
                      width: 16,
                      height: 16,
                      paddingLeft: "70%",
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
      <Button
        mode="contained"
        style={styles.btn_new}
        onPress={() => navigation.navigate("CreateClass")}
      >
        Create Class
      </Button>
    </SafeAreaView>
  );
};

export default ClassScreen;

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
    marginTop: 5,
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
