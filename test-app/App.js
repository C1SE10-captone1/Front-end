import React from "react";
import { Provider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { theme } from "./src/core/theme";
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  Dashboard,
  ExamScreen,
  ClassScreen,
  CreateClass,
  ProfileScreen,
  CreateExam,
  CreateStudent,
  ClassDetail,
  ExamDetail,
  StudentScreen,
  AnswerStudent,
  AnswerKey,
  Result,
  AnalystExam,
} from "./src/screens";
import TabBottom from "./src/components/TabBottom";
import { AuthContextProvider } from "./src/utils/AuthContext";

const Stack = createStackNavigator();

export default function App(): React.FC {
  return (
    // <AuthContextProvider>
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="StartScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="TabBottom" component={TabBottom} />

          {/* in progress */}
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="Result" component={Result} />
          <Stack.Screen name="AnswerKey" component={AnswerKey} />
          <Stack.Screen name="AnswerStudent" component={AnswerStudent} />
          <Stack.Screen name="AnalystExam" component={AnalystExam} />

          {/* done 80%, no database yet */}
          <Stack.Screen name="CreateStudent" component={CreateStudent} />
          <Stack.Screen name="StudentScreen" component={StudentScreen} />
          <Stack.Screen name="ExamDetail" component={ExamDetail} />
          <Stack.Screen name="ClassDetail" component={ClassDetail} />
          <Stack.Screen name="ClassScreen" component={ClassScreen} />
          <Stack.Screen name="CreateExam" component={CreateExam} />
          <Stack.Screen name="ExamScreen" component={ExamScreen} />
          <Stack.Screen name="CreateClass" component={CreateClass} />

          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
    // </AuthContextProvider>
  );
}
