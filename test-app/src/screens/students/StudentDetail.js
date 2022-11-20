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
import React, { useEffect, useState } from "react";
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
const StudentDetail = ({ route, navigation }) => {
  const studentId = route.params.id;

  const currentUser = supabase.auth.user();
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState(colection || null);

  const loadData = async () => {
    let { data: student, error } = await supabase
      .from("students")
      .select(
        `*, classes (
        id, name, uid
      )`
      )
      .eq("id", studentId)
      .eq("classes.uid", currentUser.id)
      .eq("is_delete", false)
      .eq("classes.is_delete", false)
      .order("full_name", { ascending: true });

    if (student.length === 0) {
      setStudents(null);
    } else {
      setStudents(student);
    }
  };

  useEffect(() => {
    loadData();
    setTimeout(async () => {
      setLoading(false);
    }, 2000);
  }, [currentUser]);

  return (
    <SafeAreaView style={styles.container}>
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
            Student Detail
          </Text>
        </View>
      </View>

      <View>
        <FlatList
          keyExtractor={(item) => item.id.toFixed()}
          data={students}
          nestedScrollEnabled
          scrollEnabled
          showsVerticalScrollIndicator
          renderItem={({ item, index }) => {
            return (
              <View>
                <View>
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
                    <View style={{ flexDirection: "row", paddingLeft: 20 }}>
                      <View style={{ flexDirection: "column", width: "85%" }}>
                        <Text style={styles.row_title}>{item.full_name}</Text>
                      </View>
                      <View style={{ flexDirection: "column", width: "85%" }}>
                        <Text style={styles.row_title}>
                          {item.student_code}
                        </Text>
                      </View>

                      <View
                        style={{
                          flexDirection: "column",
                          width: "5%",
                          display: "flex",
                          top: "30%",
                          right: 10,
                          position: "absolute",
                        }}
                      >
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate("StudentDetail", {
                              id: classId,
                            })
                          }
                        >
                          <Image
                            source={require("../../assets/Arrow.png")}
                            resizeMode="contain"
                            style={{
                              width: 16,
                              height: 16,
                            }}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default StudentDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
