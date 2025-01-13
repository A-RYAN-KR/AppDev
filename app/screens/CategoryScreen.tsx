import React from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles/CategoryScreenStyle";

interface DessertItem {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  timeRange: string;
  image: any;
  isFavorite?: boolean;
}

const CategoryScreen: React.FC = () => {
  const desserts: DessertItem[] = [
    {
      id: "1",
      name: "Cheesecake with blueberry sauce",
      description: "Classic dessert",
      price: 5.99,
      rating: 4.9,
      timeRange: "20-25 Min",
      image: {
        uri: "https://www.mybakingaddiction.com/wp-content/uploads/2022/08/plated-blueberry-cheesecake-hero.jpg",
      },
      isFavorite: false,
    },
    {
      id: "2",
      name: "Granola and berries",
      description: "Healthy breakfast",
      price: 4.99,
      rating: 4.9,
      timeRange: "20-25 Min",
      image: {
        uri: "https://driscolls.imgix.net/-/media/assets/recipes/mixed-berry-parfait-with-steel-cut-granola.ashx",
      },
      isFavorite: true,
    },
    {
      id: "3",
      name: "Mousse cold whipping cream",
      description: "Whipping cream",
      price: 3.99,
      rating: 4.9,
      timeRange: "20-25 Min",
      image: {
        uri: "https://thefirstyearblog.com/wp-content/uploads/2020/12/chocolate-mousse-square.png",
      },
      isFavorite: false,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dessert</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.cartButton}>
          <Ionicons name="cart-outline" size={24} color="#000" />
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>1</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Dessert List */}
      <ScrollView style={styles.scrollView}>
        {desserts.map((dessert) => (
          <TouchableOpacity key={dessert.id} style={styles.dessertCard}>
            <Image source={dessert.image} style={styles.dessertImage} />
            <View style={styles.dessertInfo}>
              <View>
                <Text style={styles.dessertName}>{dessert.name}</Text>
                <Text style={styles.dessertDescription}>
                  {dessert.description}
                </Text>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={16} color="#FFD700" />
                  <Text style={styles.rating}>{dessert.rating}</Text>
                  <View style={styles.timeContainer}>
                    <Ionicons name="time-outline" size={16} color="#666" />
                    <Text style={styles.timeText}>{dessert.timeRange}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.priceContainer}>
                <Text style={styles.price}>${dessert.price}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={[
                styles.favoriteButton,
                dessert.isFavorite && styles.favoriteButtonActive,
              ]}
            >
              <Ionicons
                name={dessert.isFavorite ? "heart" : "heart-outline"}
                size={20}
                color={dessert.isFavorite ? "#FF0000" : "#000"}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CategoryScreen;
