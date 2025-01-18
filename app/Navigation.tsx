import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import { NavigationContainer } from "@react-navigation/native";
import WelcomeScreen from "./screens/WelcomeScreen";
import HomeScreen from "./screens/HomeScreen";
import TableScreen from "./screens/TableScreen";
import DashboardScreen from "./screens/DashboardScreeen";
import UserSelectionScreen from "./screens/UserSelectionScreen";
import CustomerHomeScreen from "./screens/CustomerHomeScreen";
import CategoryScreen from "./screens/CategoryScreen";
import CartScreen from "./screens/Cart";

export type RootStackParamList = {
  User: undefined;
  Welcome: undefined;
  Login: undefined;
  Signup: undefined;
  Home: undefined;
  Table: undefined;
  Dashboard: undefined;
  CustomerHome: undefined;
  Category: undefined;
  Cart : undefined;
};


const Stack = createStackNavigator<RootStackParamList>();

const Navigation: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="User" component={UserSelectionScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Table" component={TableScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="CustomerHome" component={CustomerHomeScreen} />
      <Stack.Screen name="Category" component={CategoryScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />

      
    </Stack.Navigator>

    
  );
};

export default Navigation;
