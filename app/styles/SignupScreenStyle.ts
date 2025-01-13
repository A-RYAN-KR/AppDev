import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 20,
  },
  illustrationContainer: {
    height: Platform.OS === "ios" ? "35%" : "30%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: Platform.OS === "ios" ? 20 : 10,
  },
  illustration: {
    width: "80%",
    height: "80%",
    borderColor: "#ffffff",
    borderWidth: 2,
    borderRadius: 50,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    width: "100%",
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    color: "#fff",
    fontSize: 16,
  },
  signUpButton: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    marginTop: 5,
  },
  signUpText: {
    color: "#5046e5",
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    color: "white",
    marginTop: 15,
    textAlign: "center",
    marginBottom: Platform.OS === "ios" ? 20 : 10,
  },
});

export default styles;