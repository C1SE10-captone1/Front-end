import {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "../utils/supabase-service";
import { theme } from "../core/theme";

const ProfileScreen = ({ navigation }) => {
  const currentUser = supabase.auth.user();

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      alert("Signed out success!");
    }
    if (error) {
      alert(error.message);
    }
    navigation.reset({
      index: 0,
      routes: [{ name: "StartScreen" }],
    });
    // Alert.alert("Sign out!", "Are you sure sign out ?", [
    //   {
    //     text: "OK",
    //     onPress: async () => {

    //     },
    //   },
    // ]);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        {/* information account */}
        <View style={styles.inforUser}>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ width: "30%" }}>Email: </Text>
            <Text>{currentUser.email}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ width: "30%" }}>Password: </Text>
            <Text>******</Text>
          </View>
        </View>

        {/*  */}
        <View style={styles.content}>
          <View style={styles.shadow}>
            <TouchableOpacity style={styles.box}>
              <View
                style={{
                  width: 30,
                  height: 30,
                  backgroundColor: "#34C759",
                  borderRadius: 10,
                }}
              >
                <Image
                  source={require("../assets/termOfService.png")}
                  resizeMode="contain"
                  style={{
                    width: 20,
                    height: 20,
                    top: 5,
                    left: 5,
                  }}
                />
              </View>
              <Text style={styles.text}>Terms of service</Text>
              <View style={styles.ico_arrow}>
                <Image
                  source={require("../assets/Arrow.png")}
                  resizeMode="contain"
                  style={styles.image}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.shadow}>
            <TouchableOpacity style={styles.box}>
              <View
                style={{
                  width: 30,
                  height: 30,

                  backgroundColor: "#5856D6",
                  borderRadius: 10,
                }}
              >
                <Image
                  source={require("../assets/question.png")}
                  resizeMode="contain"
                  style={{
                    width: 20,
                    height: 20,
                    top: 5,
                    left: 5,
                  }}
                />
              </View>
              <Text style={styles.text}>FAQ</Text>
              <View style={styles.ico_arrow}>
                <Image
                  source={require("../assets/Arrow.png")}
                  resizeMode="contain"
                  style={styles.image}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.shadow}>
            <TouchableOpacity style={styles.box}>
              <View
                style={{
                  width: 30,
                  height: 30,
                  backgroundColor: theme.colors.placeholder,
                  borderRadius: 10,
                }}
              >
                <Image
                  source={require("../assets/Lock.png")}
                  resizeMode="contain"
                  style={{
                    width: 20,
                    height: 20,
                    top: 5,
                    left: 5,
                  }}
                />
              </View>
              <Text style={styles.text}>Privacy policy</Text>
              <View style={styles.ico_arrow}>
                <Image
                  source={require("../assets/Arrow.png")}
                  resizeMode="contain"
                  style={styles.image}
                />
              </View>
            </TouchableOpacity>
          </View>
          {/* log out */}
          <View style={styles.shadow}>
            <TouchableOpacity style={styles.box} onPress={logout}>
              <View
                style={{
                  width: 30,
                  height: 30,
                  backgroundColor: theme.colors.error,
                  borderRadius: 10,
                }}
              >
                <Image
                  source={require("../assets/logout.png")}
                  resizeMode="contain"
                  style={{
                    width: 20,
                    height: 20,
                    top: 5,
                    left: 5,
                  }}
                />
              </View>
              <Text style={styles.text}>Logout</Text>
              <View style={styles.ico_arrow}>
                <Image
                  source={require("../assets/Arrow.png")}
                  resizeMode="contain"
                  style={styles.image}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/* version and information teamdev */}
        <View style={styles.footer}>
          <Text>Version 1.0.1</Text>
          <Text>Team Developer: Group 9_IG5</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, width: "100%" },
  content: {
    marginHorizontal: 40,
    height: "60%",
  },
  inforUser: {
    paddingTop: 10,

    width: "100%",
    backgroundColor: theme.colors.background,
    height: 100,
    marginBottom: 50,
    paddingLeft: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
  },
  shadow: {
    backgroundColor: theme.colors.background,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    marginVertical: 10,
    borderRadius: 10,
  },

  box: {
    flexDirection: "row",
    alignContent: "center",
    marginVertical: 5,
    height: 30,
  },

  text: {
    alignContent: "center",
    paddingLeft: 30,
  },
  image: {
    width: 14,
    height: 14,
    color: "#ffffff",
    color: theme.colors.label,
    borderRadius: 10,
  },
  ico_arrow: {
    display: "flex",
    top: 7,
    right: 25,
    position: "absolute",
  },
  footer: {
    color: "#516F7F",
    display: "flex",
    bottom: "-10%",
    right: 10,
    position: "absolute",
  },
});
