import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import styles from "../styles/SignupScreenStyle";
import { LinearGradient } from "expo-linear-gradient";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { firebase_app } from "@/FirebaseConfig";
import Toast from "react-native-toast-message"; // Import Toast

type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
};

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Login"
>;

interface LoginScreenProps {
  onSubmit?: (data: { name: string; email: string; password: string }) => void;
  navigation: LoginScreenNavigationProp;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onSubmit, navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth(firebase_app);

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      

      // Show success toast
      Toast.show({
        type: "success",
        text1: "Signup Successful",
        text2: "Your account has been created successfully.",
      });

      // Clear the input fields
      setName("");
      setEmail("");
      setPassword("");

      // Add a slight delay before navigating to Login screen
      setTimeout(() => {
        navigation.navigate("Login");
      }, 1500); // Delay of 1500ms (2 seconds)

    } catch (error: any) {
     

      // Show error toast with error message
      Toast.show({
        type: "error",
        text1: "Signup Failed",
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
                    uri: "https://cdni.iconscout.com/illustration/premium/thumb/sign-up-illustration-download-in-svg-png-gif-file-formats--account-login-miscellaneous-pack-illustrations-5230178.png?f=webp",
                  }}
                  style={styles.illustration}
                  resizeMode="contain"
                />
              </View>

              <View style={styles.contentContainer}>
                <Text style={styles.title}>Sign Up</Text>

                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Name"
                    placeholderTextColor="rgba(255, 255, 255, 0.7)"
                    value={name}
                    onChangeText={setName}
                  />

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

                  <TouchableOpacity
                    style={styles.signUpButton}
                    onPress={handleSignUp}
                  >
                    <Text style={styles.signUpText}>Sign Up</Text>
                  </TouchableOpacity>

                  <TouchableOpacity>
                    <Text
                      style={styles.link}
                      onPress={() => navigation.navigate("Login")}
                    >
                      Already have an account? Login
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </SafeAreaView>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      {/* Add Toast component */}
      <Toast />
    </LinearGradient>
  );
};

export default LoginScreen;
