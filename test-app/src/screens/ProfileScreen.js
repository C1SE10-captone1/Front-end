import { StyleSheet, Button, View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "../utils/supabase-service";

const ProfileScreen = ({ navigation }) => {
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    setCurrentUser(supabase.auth.user().email);
  }, []);
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      alert("Signed out!");
    }
    if (error) {
      alert(error.message);
    }
    navigation.reset({
      index: 0,
      routes: [{ name: "StartScreen" }],
    });
  };
  return (
    <View>
      <Text>{currentUser}</Text>
      <Button
        status="danger"
        title="Logout"
        onPress={logout}
        style={{
          marginTop: 10,
        }}
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
