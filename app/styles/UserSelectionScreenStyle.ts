import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    marginBottom: 50,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ffee82",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    backgroundColor: "#FFD700",
    padding: 12,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#000",
  },
  selectionContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  userCard: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: 150,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  avatar: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  userType: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});

export default styles;