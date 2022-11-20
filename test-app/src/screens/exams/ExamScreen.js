import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  FlatList,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import Button from "../../components/Button";
import { theme } from "../../core/theme";
import { supabase } from "../../utils/supabase-service";

let colection = {
  id: "",
  name: "",
  date_exam: "",
  class_id: "",
  description: "",
};
const ExamScreen = ({ navigation }) => {
  const [exam, setExam] = useState(colection);
  const [loading, setLoading] = useState(false);
  const currentUser = supabase.auth.user();

  const loadExams = async () => {
    let { data: exams, error } = await supabase
      .from("exams")
      .select(
        `*,
    classes (
      id, name,uid
    )
  `
      )
      .eq("is_delete", false)
      .eq("classes.uid", `${currentUser.id}`)
      .eq("classes.is_delete", false)
      .order("date_exam", { ascending: false });

    setExam(exams.filter((e) => e.classes !== null));
  };

  useEffect(() => {
    loadExams().then();
  }, [navigation]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ minHeight: "90%" }}>
        <FlatList
          keyExtractor={(item) => item.id.toFixed()}
          data={exam}
          nestedScrollEnabled
          scrollEnabled
          showsVerticalScrollIndicator
          renderItem={({ item, index }) => {
            return (
              <View>
                <View style={styles.box_title}>
                  <Text style={styles.date}>{item.date_exam}</Text>
                </View>

                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("ExamDetail", {
                      id: item.id,
                    })
                  }
                >
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
                            source={require("../../assets/ico_exam.png")}
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
                            {/* {item.filter((e) => ( */}
                            <Text style={styles.name_class}>
                              {item.classes.name}
                            </Text>
                            {/* ))} */}
                          </View>
                          <View style={{ flexDirection: "row" }}>
                            <Text style={styles.name_exam}>{item.name}</Text>
                          </View>
                          <View style={{ flexDirection: "row" }}>
                            <Text style={styles.note}>{item.description}</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
      <TouchableOpacity
        style={styles.btn_new}
        onPress={() => navigation.navigate("CreateExam")}
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
    letterSpacing: 3,
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
