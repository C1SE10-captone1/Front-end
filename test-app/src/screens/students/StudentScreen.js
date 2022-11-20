import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import Button from "../../components/Button";
import { supabase } from "../../utils/supabase-service";
import { theme } from "../../core/theme";

let colection = {
  id: "",
  full_name: "",
  student_code: "",
  class_id: "",
  is_delete: "",
};
const StudentScreen = ({ route, navigation }) => {
  const classId = route.params.id;
  const currentUser = supabase.auth.user();
  const [students, setStudents] = useState(colection);
  const loadStudent = async () => {
    let { data: student, error } = await supabase
      .from("students")
      .select(
        `*, classes (
        id,uid
      )`
      )
      .eq("class_id", classId)
      .eq("classes.uid", currentUser.id)
      .eq("is_delete", false)
      .eq("classes.is_delete", false)
      .order("full_name", { ascending: true });
    setStudents(student);
  };

  useEffect(() => {
    loadStudent().then();
  }, []);
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
            source={require("../../assets/arrow_back.png")}
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
      <View style={{ flex: 1 }}>
        <FlatList
          keyExtractor={(item) => item.id.toFixed()}
          data={students}
          nestedScrollEnabled
          scrollEnabled
          showsVerticalScrollIndicator
          renderItem={({ item, index }) => {
            return (
              <View>
                <TouchableOpacity>
                  <View style={styles.row}>
                    <View style={{ flexDirection: "column" }}>
                      <View style={{ flexDirection: "row" }}>
                        <Image
                          source={require("../../assets/person.png")}
                          resizeMode="contain"
                          style={{
                            width: 50,
                            height: 50,
                          }}
                        />
                      </View>
                      <StatusBar style="auto" />
                    </View>
                    <View style={{ flexDirection: "column", paddingLeft: 20 }}>
                      <View style={{ flexDirection: "row" }}>
                        <Text style={styles.row_title}>{item.full_name}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>

      {/* <ScrollView style={{ width: "100%" }}>

        <TouchableOpacity>
          <View style={styles.row}>
            <View style={{ flexDirection: "column" }}>
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={require("../../assets/person.png")}
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
                  source={require("../../assets/person.png")}
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
                  source={require("../../assets/person.png")}
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
                  source={require("../../assets/person.png")}
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
      </ScrollView> */}

      {/* button add new student */}
      <TouchableOpacity
        style={styles.btn_new}
        onPress={() => navigation.navigate("CreateStudent", { id: classId })}
      >
        <Image
          source={require("../../assets/Vector.png")}
          resizeMode="contain"
          style={{
            width: 20,
            height: 20,
            display: "flex",
            right: -14,
            bottom: 1,
          }}
        />
      </TouchableOpacity>
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
    height: "auto",
    borderRadius: 10,
    width: "100%",
    marginTop: 3,
  },
  btn_new: {
    backgroundColor: theme.colors.primary,
    borderRadius: 100,
    display: "flex",
    width: 50,
    height: 50,
    bottom: 10,
    right: 20,
    justifyContent: "center",
    alignContent: "center",
    position: "absolute",
  },
});
