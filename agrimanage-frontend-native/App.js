import { NavigationContainer } from "@react-navigation/native";
import Navbar from "./components/Navbar/Navbar";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Navbar />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
