import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  illustrationContainer: {
    height: 300,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  illustration: {
    width: "80%",
    height: "80%",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    opacity: 0.8,
    marginBottom: 40,
  },
  buttonContainer: {
    width: "100%",
    gap: 15,
  },
  loginButton: {
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: 15,
    width: "100%",
    alignItems: "center",
  },
  loginButtonText: {
    color: "#5046e5",
    fontSize: 16,
    fontWeight: "bold",
  },
  signUpButton: {
    backgroundColor: "transparent",
    borderRadius: 25,
    padding: 15,
    width: "100%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#fff",
  },
  signUpButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  socialText: {
    color: "#fff",
    marginTop: 30,
    marginBottom: 20,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  socialButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  socialIcon: {
    width: 24,
    height: 24,
  },
  link: { color: "white", marginTop: 10, textAlign: "center" },
});

export default styles;