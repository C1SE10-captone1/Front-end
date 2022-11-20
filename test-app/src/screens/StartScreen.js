import React, { useContext, useEffect } from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import Paragraph from "../components/Paragraph";
import { AuthContext } from "../utils/AuthProvider";
// import { NavigationContainer } from "@react-navigation/native";

export default function StartScreen({ navigation }) {
  // const auth = useContext(AuthContext);
  // const user = auth.user;
  // const navigation = NavigationContainer();

  return (
    <Background>
      <Logo />
      <Header>InstaGrade</Header>
      <Paragraph>
        The easiest way to start with your amazing application.
      </Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("LoginScreen")}
      >
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate("RegisterScreen")}
      >
        Sign Up
      </Button>
    </Background>
  );
}
