import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import styles from "../styles/WelcomeScreenStyle";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";

type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Signup: undefined;
};

type WelcomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Welcome"
>;

interface WelcomeScreenProps {
  navigation: WelcomeScreenNavigationProp;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  const handleSocialLogin = (platform: "facebook" | "google" | "linkedin") => {
    // Implement social login logic here
    console.log(`${platform} login pressed`);
  };

  return (
    <LinearGradient colors={["#6c63ff", "#5046e5"]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <View style={styles.illustrationContainer}>
            <Image
              source={{
                uri: "https://img.freepik.com/free-vector/privacy-policy-concept-illustration_114360-7853.jpg?semt=ais_hybrid",
              }}
              style={styles.illustration}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.title}>Hello</Text>
          <Text style={styles.subtitle}>
            Welcome To Little Drop, where{"\n"}you manage your daily tasks
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.signUpButton}
              onPress={() => navigation.navigate("Signup")}
            >
              <Text style={styles.signUpButtonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.socialText}>Sign up using</Text>

          <View style={styles.socialContainer}>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => handleSocialLogin("facebook")}
            >
              <Image
                source={{
                  uri: "https://cdn-icons-png.freepik.com/256/5968/5968764.png?semt=ais_hybrid",
                }}
                style={styles.socialIcon}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => handleSocialLogin("google")}
            >
              <Image
                source={{
                  uri: "https://cdn-teams-slug.flaticon.com/google.jpg",
                }}
                style={styles.socialIcon}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => handleSocialLogin("linkedin")}
            >
              <Image
                source={{
                  uri: "https://cdn1.iconfinder.com/data/icons/logotypes/32/circle-linkedin-512.png",
                }}
                style={styles.socialIcon}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <Text
              style={styles.link}
              onPress={() => navigation.navigate("Login")}
            >
              Don't have an account? Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default WelcomeScreen;
