import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import styles from "../styles/HomeScreenStyle";
import { Ionicons } from "@expo/vector-icons";
import Sidebar from "../Sidebar";

interface OrderItem {
  tableNo: number;
  startingTime: string;
  total: number;
}

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const orders: OrderItem[] = [
    { tableNo: 0, startingTime: "03:10AM", total: 0 },
    { tableNo: 1, startingTime: "13:10AM", total: 10000 },
    { tableNo: 2, startingTime: "23:10AM", total: 20000 },
    { tableNo: 3, startingTime: "33:10AM", total: 30000 },
  ];

  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const menuItems = [
    {
      icon: "home-outline",
      title: "Dashboard",
      onPress: () => {
        setIsSidebarVisible(false);
        // Add navigation logic
        navigation.navigate("Dashboard");
      },
    },
    {
      icon: "restaurant-outline",
      title: "Orders",
      onPress: () => {
        setIsSidebarVisible(false);
        // Add navigation logic
      },
    },
    {
      icon: "grid-outline",
      title: "Tables",
      onPress: () => {
        setIsSidebarVisible(false);
        // Add navigation logic
        navigation.navigate("Table");
      },
    },
    {
      icon: "settings-outline",
      title: "Settings",
      onPress: () => {
        setIsSidebarVisible(false);
        // Add navigation logic
      },
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Ionicons name="restaurant-outline" size={24} color="black" />
          </View>
        </View>
        <TouchableOpacity onPress={() => setIsSidebarVisible(true)}>
          <Ionicons name="menu" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Status Cards */}
      <View style={styles.statusContainer}>
        <TouchableOpacity style={styles.statusCard}>
          <View style={styles.statusIconContainer}>
            <Ionicons name="restaurant" size={24} color="black" />
          </View>
          <View style={styles.statusTextContainer}>
            <Text style={styles.statusTitle}>Running Order</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusBadgeText}>5</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.statusCard}>
          <View style={styles.statusIconContainer}>
            <Ionicons name="grid-outline" size={24} color="black" />
          </View>
          <View style={styles.statusTextContainer}>
            <Text style={styles.statusTitle}>Table Status</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusBadgeText}>5/15</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* Orders List */}
      <View style={styles.ordersContainer}>
        <Text style={styles.ordersTitle}>Your Orders</Text>

        <View style={styles.orderHeaderRow}>
          <Text style={styles.headerText}>Table No</Text>
          <Text style={styles.headerText}>Starting Time</Text>
          <Text style={styles.headerText}>Total</Text>
          <Text style={styles.headerText}></Text>
        </View>

        <ScrollView>
          {orders.map((order, index) => (
            <TouchableOpacity key={index} style={styles.orderRow}>
              <View style={styles.tableContainer}>
                <Ionicons name="grid-outline" size={20} color="#FFD700" />
                <Text style={styles.tableText}>{order.tableNo}</Text>
              </View>
              <Text style={styles.timeText}>{order.startingTime}</Text>
              <Text style={styles.totalText}>{order.total}</Text>
              <Ionicons name="chevron-forward" size={20} color="gray" />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <Sidebar
        isVisible={isSidebarVisible}
        onClose={() => setIsSidebarVisible(false)}
        menuItems={menuItems}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
