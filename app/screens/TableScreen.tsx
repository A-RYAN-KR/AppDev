import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Modal,
  Alert,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import styles from "../styles/TableScreenStyle";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { firebase_app } from "@/FirebaseConfig";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../Navigation";


// Initialize Firebase
const db = getFirestore(firebase_app);

interface TableData {
  id: string;
  number: number;
  seats: number;
  isOccupied: boolean;
  createdAt: number;
}

interface TableProps extends Omit<TableData, "createdAt"> {
  isSelected: boolean;
  onSelect: (id: string) => void;
  onLongPress: (id: string) => void;
}

const Table: React.FC<TableProps> = ({
  id,
  number,
  isSelected,
  isOccupied,
  seats,
  onSelect,
  onLongPress,
}) => (
  <TouchableOpacity
    style={[
      styles.table,
      seats === 6 ? styles.largeTable : styles.normalTable,
      seats === 8 ? styles.extraLargeTable : null,
      isSelected ? styles.selectedTable : null,
      isOccupied ? styles.occupiedTable : null,
    ]}
    onPress={() => !isOccupied && onSelect(id)}
    onLongPress={() => onLongPress(id)}
    delayLongPress={500}
    disabled={isOccupied}
  >
    <Text
      style={[
        styles.tableText,
        isSelected ? styles.selectedTableText : null,
        isOccupied ? styles.occupiedTableText : null,
      ]}
    >
      {number}
    </Text>
    <Text style={styles.seatsText}>{seats} seats</Text>
  </TouchableOpacity>
);

const TableScreen: React.FC = () => {
  const [tables, setTables] = useState<TableData[]>([]);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [newTableSeats, setNewTableSeats] = useState("4");
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Subscribe to tables collection
  useEffect(() => {
    const tablesRef = collection(db, "tables");
    const q = query(tablesRef, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const tableData: TableData[] = [];
        snapshot.forEach((doc) => {
          tableData.push({ id: doc.id, ...doc.data() } as TableData);
        });
        setTables(tableData);
        setIsLoading(false);
      },
      (error) => {
        console.error("Error fetching tables:", error);
        setError("Failed to load tables. Please try again later.");
        setIsLoading(false);
      }
    );

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  const handleAddTable = async () => {
    try {
      const tablesRef = collection(db, "tables");
      const newTableNumber =
        tables.length > 0 ? Math.max(...tables.map((t) => t.number)) + 1 : 1;

      await addDoc(tablesRef, {
        number: newTableNumber,
        seats: parseInt(newTableSeats),
        isOccupied: false,
        createdAt: Date.now(),
      });

      setIsAddModalVisible(false);
      setNewTableSeats("4");
    } catch (error) {
      console.error("Error adding table:", error);
      Alert.alert("Error", "Failed to add table. Please try again.");
    }
  };

  const handleRemoveTable = async (id: string) => {
    Alert.alert("Remove Table", "Are you sure you want to remove this table?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Remove",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteDoc(doc(db, "tables", id));
            if (selectedTable === id) {
              setSelectedTable(null);
            }
          } catch (error) {
            console.error("Error removing table:", error);
            Alert.alert("Error", "Failed to remove table. Please try again.");
          }
        },
      },
    ]);
  };

  const handleTableSelect = (id: string) => {
    setSelectedTable(id);
  };

  const handleTableLongPress = (id: string) => {
    if (!isEditMode) return;
    handleRemoveTable(id);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading tables...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={48} color="#FF3B30" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => {
            setError(null);
            setIsLoading(true);
          }}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Table Management</Text>
        <TouchableOpacity
          onPress={() => setIsEditMode(!isEditMode)}
          style={[styles.editButton, isEditMode && styles.editButtonActive]}
        >
          <Ionicons
            name={isEditMode ? "create" : "create-outline"}
            size={24}
            color={isEditMode ? "#007AFF" : "#333"}
          />
        </TouchableOpacity>
      </View>

      {/* Edit Mode Instructions */}
      {isEditMode && (
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsText}>
            Long press on a table to remove it
          </Text>
        </View>
      )}

      {/* Tables Grid */}
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.tablesContainer}>
          {tables.map((table) => (
            <Table
              key={table.id}
              {...table}
              isSelected={selectedTable === table.id}
              onSelect={handleTableSelect}
              onLongPress={handleTableLongPress}
            />
          ))}
        </View>
      </ScrollView>

      {/* Add Table Button */}
      {isEditMode && (
        <TouchableOpacity
          style={styles.addTableButton}
          onPress={() => setIsAddModalVisible(true)}
        >
          <Ionicons name="add-circle" size={24} color="#fff" />
          <Text style={styles.addTableButtonText}>Add New Table</Text>
        </TouchableOpacity>
      )}

      {/* Add Table Modal */}
      <Modal visible={isAddModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Table</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Number of Seats:</Text>
              <View style={styles.seatSelector}>
                {[2, 4, 6, 8].map((num) => (
                  <TouchableOpacity
                    key={num}
                    style={[
                      styles.seatOption,
                      parseInt(newTableSeats) === num &&
                        styles.selectedSeatOption,
                    ]}
                    onPress={() => setNewTableSeats(num.toString())}
                  >
                    <Text
                      style={[
                        styles.seatOptionText,
                        parseInt(newTableSeats) === num &&
                          styles.selectedSeatOptionText,
                      ]}
                    >
                      {num}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setIsAddModalVisible(false);
                  setNewTableSeats("4");
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.addButton]}
                onPress={handleAddTable}
              >
                <Text style={styles.addButtonText}>Add Table</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Next Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.nextButton,
            !selectedTable && styles.nextButtonDisabled,
          ]}
          disabled={!selectedTable || isEditMode}
        >
          <Text style={styles.nextButtonText}>NEXT</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default TableScreen;
