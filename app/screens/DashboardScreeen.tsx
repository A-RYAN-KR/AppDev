import React from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import styles from "../styles/DashboardScreenStyle";
import { Ionicons } from "@expo/vector-icons";
import { LineChart, BarChart, PieChart } from "react-native-chart-kit";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "expo-router";

const { width } = Dimensions.get("window");

// Define the navigation type
type MainStackParamList = {
  Home: undefined;
  Dashboard: undefined;
};

type NavigationProp = StackNavigationProp<MainStackParamList>;

const DashboardScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  // Handle back navigation
  const handleBack = () => {
    navigation.goBack();
  };

  // Sample data for charts
  const orderData = {
    total: 145,
    completed: 98,
    pending: 47,
    revenue: "₹45,690",
  };

  const tableData = {
    labels: ["Occupied", "Available", "Reserved"],
    data: [12, 8, 5],
    colors: ["#FF6B6B", "#4ECDC4", "#FFE66D"],
  };

  const peakHoursData = {
    labels: ["10", "12", "14", "16", "18", "20", "22"],
    datasets: [
      {
        data: [15, 45, 40, 20, 50, 45, 30],
      },
    ],
  };

  const revenueData = {
    labels: ["Main", "Outdoor", "Private", "Bar"],
    datasets: [
      {
        data: [25000, 15000, 18000, 12000],
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.7,
    useShadowColorFromDataset: false,
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Dashboard</Text>
            <Text style={styles.headerDate}>
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </Text>
          </View>
        </View>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer}>
        {/* Orders Overview Cards */}
        <View style={styles.cardsContainer}>
          <View style={[styles.card, styles.orderCard]}>
            <Ionicons name="restaurant-outline" size={24} color="#FF6B6B" />
            <Text style={styles.cardValue}>{orderData.total}</Text>
            <Text style={styles.cardLabel}>Total Orders</Text>
          </View>
          <View style={[styles.card, styles.orderCard]}>
            <Ionicons
              name="checkmark-circle-outline"
              size={24}
              color="#4ECDC4"
            />
            <Text style={styles.cardValue}>{orderData.completed}</Text>
            <Text style={styles.cardLabel}>Completed</Text>
          </View>
          <View style={[styles.card, styles.orderCard]}>
            <Ionicons name="time-outline" size={24} color="#FFE66D" />
            <Text style={styles.cardValue}>{orderData.pending}</Text>
            <Text style={styles.cardLabel}>Pending</Text>
          </View>
        </View>

        {/* Revenue Card */}
        <View style={[styles.card, styles.chartCard]}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Today's Revenue</Text>
            <Text style={styles.revenue}>{orderData.revenue}</Text>
          </View>
          <BarChart
            data={revenueData}
            width={width - 64}
            height={220}
            chartConfig={chartConfig}
            style={styles.chartStyle}
            showValuesOnTopOfBars
            fromZero
          />
        </View>

        {/* Table Status */}
        <View style={[styles.card, styles.chartCard]}>
          <Text style={styles.cardTitle}>Table Status</Text>
          <PieChart
            data={tableData.labels.map((label, index) => ({
              name: label,
              population: tableData.data[index],
              color: tableData.colors[index],
              legendFontColor: "#7F7F7F",
              legendFontSize: 12,
            }))}
            width={width - 64}
            height={220}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
          />
        </View>

        {/* Peak Hours */}
        <View style={[styles.card, styles.chartCard]}>
          <Text style={styles.cardTitle}>Peak Hours</Text>
          <LineChart
            data={peakHoursData}
            width={width - 64}
            height={220}
            chartConfig={{
              ...chartConfig,
              color: (opacity = 1) => `rgba(255, 107, 107, ${opacity})`,
            }}
            style={styles.chartStyle}
            bezier
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DashboardScreen;
