import React, { useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  Text
} from "react-native";
import Logo from "../../components/Logo";
import Header from "../../components/Header";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import BackButton from "../../components/BackButton";
import { theme } from "../../core/theme";
import { emailValidator } from "../../helpers/emailValidator";
import { passwordValidator } from "../../helpers/passwordValidator";
import { supabase } from "../../utils/supabase-service";
// import { NavigationContainer } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Layout, useTheme, themeColor } from "react-native-rapi-ui";
// import { useAuth } from "../utils/AuthContext";
import { AuthStackParamList } from "../../types/navigation";

export default function ({
  navigation,
}: NativeStackScreenProps<AuthStackParamList, "Login">) {
  const { isDarkmode, setTheme } = useTheme();
  const [email, setEmail] = useState < string > ();
  const [password, setPassword] = useState < string > ();
  const [errorE, setErrorE] = useState < string >();
  const [errorP, setErrorP] = useState < string >();
  // const [email, setEmail] = useState({ value: "", error: "" });
  // const [password, setPassword] = useState({ value: "", error: "" });
  const [loading, setLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(true);
  // const { signIn } = useAuth();

  const onLoginPressed = async () => {
    setLoading(true);

    const emailError = emailValidator(email);
    const passwordError = passwordValidator(password);

    console.log("clicked login", email, password);
    // validate username & password
    if (emailError || passwordError) {
      setLoading(false);
      setErrorE(emailError);
      setErrorP(passwordError);
      return;
    }

    const {user, error } = await supabase.auth.signIn({ email: email, password: password });

    console.log(user);
    console.log(error);


    if (!error && !user) {
      setLoading(false);
      alert("Check your email for the login link!");
    }
    if (error) {
      setLoading(false);
      alert(error.message);
    }

    if (user) {
      navigation.reset({
        index: 0,
        routes: [{name: "TabBottom" }],
      });
      // navigation.navigate("TabBottom");
    }
  };

  return (
    <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
      <Layout>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
        >
          <View
            style={{
              // flex: 1,
              justifyContent: "center",
              alignItems: "center",
              // backgroundColor: isDarkmode ? "#17171E" : themeColor.white100,
            }}
          >
            <BackButton goBack={navigation.goBack} />
            <Logo />
            <Header
              style={{
                fontSize: 30,
                justifyContent: "center",
                color: theme.colors.primary,
                letterSpacing: 9,
                paddingLeft: "-10%",
              }}
            >
              Welcome
            </Header>
            <Header
              style={{
                fontSize: 40,
                justifyContent: "center",
                color: theme.colors.primary,
                letterSpacing: 1,
                fontWeight: "bold",
              }}
            >
              InstaGrade
            </Header>
            <View
              style={{
                marginHorizontal: 50,
                // flex: 1,
                // marginTop: 50,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View style={{ marginTop: 20, flexDirection: 'row',}}>
                <TextInput
                  label="Email"
                  returnKeyType="next"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  error={!!errorE}
                  errorText={errorE}
                  autoCapitalize="none"
                  autoCompleteType="email"
                  textContentType="emailAddress"
                  keyboardType="email-address"
                  description=""
                  />
              </View>
              <View style={{ marginTop: 20, flexDirection: 'row'}}>
                <TextInput
                  label="Password"
                  returnKeyType="done"
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  error={!!errorP}
                  errorText={errorP}
                  autoCapitalize="none"
                  autoCompleteType="off"
                  secureTextEntry={visible}
                  description=""
                />
                <TouchableOpacity style={{position: 'absolute',  right: -35, top: 0}} onPress={()=> setVisible(!visible)}>
                  {visible?<Image source={require("../../assets/visible.png")} style={styles.image} />:
                  <Image source={require("../../assets/invisible.png")} style={styles.image} />}
                </TouchableOpacity>
              </View>

              <View style={styles.forgotPassword}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("ResetPasswordScreen")}
                >
                  <Text style={styles.forgot}>Forgot your password?</Text>
                </TouchableOpacity>
              </View>
              <Button
                mode="contained"
                onPress={onLoginPressed}
                disabled={loading}
                style={{}}
                >
                {/* Login */}
                {loading ? "Loading" : "Continue"}
              </Button>
              <View style={styles.row}>
                <Text>Don’t have an account? </Text>
                <TouchableOpacity
                  onPress={() => navigation.replace("RegisterScreen")}
                >
                  <Text style={styles.link}>Sign up</Text>
                </TouchableOpacity>
              </View>
              {/* <TouchableOpacity
                onPress={() => {
                  isDarkmode ? setTheme("light") : setTheme("dark");
                }}
              >
                <Text
                  size="md"
                  fontWeight="bold"
                  style={{
                    marginLeft: 5,
                  }}
                >
                  {isDarkmode ? "☀️ light theme" : "🌑 dark theme"}
                </Text>
              </TouchableOpacity> */}
            </View>
          </View>
        </ScrollView>
      </Layout>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
    paddingLeft: "50%",
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  image: {
    width: 20,
    height: 20,
    display: "flex",
    top: 26,
    right: 10,
    // positions: 'absolute'
  },
});
