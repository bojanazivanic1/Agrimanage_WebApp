import { useContext, useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import { login } from "../../services/authService";
import { MaterialIcons } from "@expo/vector-icons";
import { AuthContext } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const navigation = useNavigation();
  const { onLogin } = useContext(AuthContext);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (name, value) => {
    setData({ ...data, [name]: value });
  };

  const registerHandler = () => {
    navigation.navigate("Register");
  };

  const loginHandler = () => {
    for (let field in data) {
      if (data[field] === "") {
        ToastAndroid.showWithGravity(
          "All fields must be filled.",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM
        );
        return;
      }
      data[field] = data[field].trim();
    }

    login(data).then((res) => {
      onLogin(res);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(value) => changeHandler("email", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(value) => changeHandler("password", value)}
      />
      <TouchableOpacity style={styles.button} onPress={loginHandler}>
        <MaterialIcons name="login" size={24} color="white" />
      </TouchableOpacity>

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Don't have an account?</Text>
        <TouchableOpacity onPress={registerHandler}>
          <Text style={styles.registerLink}>Register</Text>
        </TouchableOpacity>
      </View>

      {/* <View style={styles.registerContainer}>
        <Text style={styles.registerText}>
          Have you forgotten your password?
        </Text>
        <TouchableOpacity onPress={resetHandler}>
          <Text style={styles.registerLink}>Reset here</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#333",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#ccc",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 10,
    width: 250,
    borderRadius: 5,
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "#d84312",
    padding: 15,
    borderRadius: 5,
    width: 250,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  registerContainer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  registerText: {
    fontSize: 16,
    color: "#ccc",
  },
  registerLink: {
    color: "#d84312",
    fontSize: 16,
    marginLeft: 5,
  },
});

export default Login;
