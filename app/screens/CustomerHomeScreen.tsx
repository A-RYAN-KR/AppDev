import React, { useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Animated,
  Pressable,
} from "react-native";
import styles from "../styles/CustomerHomeScreenStyle";
import { Ionicons } from "@expo/vector-icons";
import { RootStackParamList } from "../Navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface FoodItem {
  id: string;
  name: string;
  price: number;
  image: { uri: string } | string;
  discount?: number;
  isFavorite?: boolean;
}

type CustomerHomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "User"
>;

interface CustomerHomeScreenProps {
  navigation: CustomerHomeScreenNavigationProp;
}

const FoodCard: React.FC<{ item: FoodItem; onPress: () => void }> = ({
  item,
  onPress,
}) => {
  const animatedValue = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(animatedValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(animatedValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View
        style={[
          styles.foodCard,
          {
            transform: [{ scale: animatedValue }],
          },
        ]}
      >
        <View style={styles.imageContainer}>
          <Image source={item.image} style={styles.foodImage} />
          <TouchableOpacity style={styles.favoriteButton}>
            <Ionicons
              name={item.isFavorite ? "heart" : "heart-outline"}
              size={20}
              color={item.isFavorite ? "red" : "gray"}
            />
          </TouchableOpacity>
          {item.discount && (
            <View style={styles.discountTag}>
              <Text style={styles.discountText}>{item.discount}% Off</Text>
            </View>
          )}
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.foodName}>{item.name}</Text>
        </View>
      </Animated.View>
    </Pressable>
  );
};

const CustomerHomeScreen: React.FC<CustomerHomeScreenProps> = ({
  navigation,
}) => {
  const foodItems: FoodItem[] = [
    {
      id: "1",
      name: "Veg Salad",
      price: 60.0,
      image: {
        uri: "https://static.vecteezy.com/system/resources/thumbnails/046/437/566/small/mix-salad-transparent-background-png.png",
      },
      isFavorite: false,
    },
    {
      id: "2",
      name: "Pasta",
      price: 95.0,
      image: {
        uri: "https://static.vecteezy.com/system/resources/thumbnails/027/144/753/small_2x/penne-pasta-with-tomato-sauce-parmesan-cheese-and-basil-on-transparent-background-png.png",
      },
      isFavorite: true,
    },
    {
      id: "3",
      name: "Fried Chicken",
      price: 120.0,
      image: {
        uri: "https://static.vecteezy.com/system/resources/thumbnails/021/665/576/small_2x/delicious-grilled-chicken-cutout-png.png",
      },
      discount: 10,
      isFavorite: false,
    },
    {
      id: "4",
      name: "Avocado Toast",
      price: 115.0,
      image: {
        uri: "https://nataliecooks.com/wp-content/uploads/2023/03/frenchtoast.png.png",
      },
      isFavorite: true,
    },
  ];

  const handleFoodPress = (item: FoodItem) => {
    console.log("Food pressed:", item.name);
    navigation.navigate("Category");
    // Add your navigation or modal logic here
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
        <TouchableOpacity style={styles.profileButton}>
          <Image
            source={{
              uri: "https://img.freepik.com/premium-photo/sales-manager-digital-avatar-generative-ai_934475-9076.jpg",
            }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
          
        </TouchableOpacity>
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={20} color="black" />
          <Text style={styles.locationText}>Ashish, Jammu</Text>
          <Ionicons name="chevron-down-outline" size={20} color="black" />
        </View>

        <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate("Cart")}>
         
          <Ionicons name="cart-outline" size={24} color="#000" />
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>1</Text>
          </View>
        </TouchableOpacity>
        
      </View>

      <Text style={styles.greeting}>Good Morning,</Text>
      <Text style={styles.userName}>Ashish</Text>

      <View style={styles.searchContainer}>
        <View style={styles.searchInput}>
          <Ionicons name="search-outline" size={20} color="gray" />
          <TextInput placeholder="Search for Lunch" style={styles.input} />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options-outline" size={20} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.categoryHeader}>
        <Text style={styles.categoryTitle}>Categories</Text>
        <TouchableOpacity>
          <Text style={styles.moreText}>More</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.foodGrid}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.gridContainer}>
          {foodItems.map((item) => (
            <View key={item.id} style={styles.cardWrapper}>
              <FoodCard item={item} onPress={() => handleFoodPress(item)} />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CustomerHomeScreen;
