import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import styles from "../styles/LoginScreenStyle";
import { LinearGradient } from "expo-linear-gradient";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { firebase_app } from "@/FirebaseConfig";
import Toast from "react-native-toast-message"; // Import Toast

type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Home: undefined;
};

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Login"
>;

interface LoginScreenProps {
  onSubmit?: (data: { email: string; password: string }) => void;
  navigation: LoginScreenNavigationProp;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onSubmit, navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth(firebase_app);

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Show success toast
      Toast.show({
        type: "success",
        text1: "Login Successful",
        text2: "You have logged in successfully.",
      });

      // Clear the fields
      setEmail("");
      setPassword("");

      setTimeout(() => {
        // Navigate to Home screen
        navigation.navigate("Home");
      }, 600); // Delay of 600ms (1.5 seconds)
    } catch (error: any) {
      // Show error toast with error message
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: error.message || "An unexpected error occurred.",
      });
    }
  };

  return (
    <LinearGradient colors={["#6c63ff", "#5046e5"]} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            bounces={false}
            showsVerticalScrollIndicator={false}
          >
            <SafeAreaView style={styles.safeArea}>
              <View style={styles.illustrationContainer}>
                <Image
                  source={{
                    uri: "https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg",
                  }}
                  style={styles.illustration}
                  resizeMode="contain"
                />
              </View>

              <View style={styles.contentContainer}>
                <Text style={styles.title}>Login</Text>

                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="rgba(255, 255, 255, 0.7)"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />

                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="rgba(255, 255, 255, 0.7)"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                  />

                  <TouchableOpacity onPress={() => {}}>
                    <Text style={styles.forgotPassword}>Forgot password?</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.signUpButton}
                    onPress={handleLogin}
                  >
                    <Text style={styles.signUpText}>Login</Text>
                  </TouchableOpacity>

                  <TouchableOpacity>
                    <Text
                      style={styles.link}
                      onPress={() => navigation.navigate("Signup")}
                    >
                      Don't have an account? Sign up
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </SafeAreaView>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      {/* Add Toast component here */}
      <Toast />
    </LinearGradient>
  );
};

export default LoginScreen;
