import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import styles from "../styles/UserSelectionScreenStyle";
import { RootStackParamList } from "../Navigation";
import { Ionicons } from "@expo/vector-icons";

// Define types for our props
// type UserSelectionScreenProps = {
//   onManagerSelect: () => void;
//   onUserSelect: () => void;
// };

type UserSelectionScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "User"
>;

interface UserSelectionScreenProps {
  navigation: UserSelectionScreenNavigationProp;
}

const UserSelectionScreen: React.FC<UserSelectionScreenProps> = ({
  navigation,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <View style={styles.logoCircle}>
          <Ionicons
            name="restaurant-outline"
            style={styles.logo}
            resizeMode="contain"
            size={40}
            color="black"
          />
        </View>
      </View>

      {/* User Selection Section */}
      <View style={styles.selectionContainer}>
        {/* Manager Card */}
        <TouchableOpacity
          style={styles.userCard}
          onPress={() => navigation.navigate("Welcome")}
          activeOpacity={0.7}
        >
          <Image
            source={{
              uri: "https://img.freepik.com/premium-photo/sales-manager-digital-avatar-generative-ai_934475-9076.jpg",
            }}
            style={styles.avatar}
            resizeMode="contain"
          />
          <Text style={styles.userType}>MANAGER</Text>
        </TouchableOpacity>

        {/* User Card */}
        <TouchableOpacity
          style={styles.userCard}
          onPress={() => navigation.navigate("CustomerHome")}
          activeOpacity={0.7}
        >
          <Image
            source={{
              uri: "https://png.pngtree.com/png-clipart/20231019/original/pngtree-user-profile-avatar-png-image_13369988.png",
            }}
            style={styles.avatar}
            resizeMode="contain"
          />
          <Text style={styles.userType}>USER</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default UserSelectionScreen;
