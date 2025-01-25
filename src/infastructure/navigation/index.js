import { AppNavigator } from "./app.navigator";
import { NavigationContainer } from "@react-navigation/native";

export const Navigator = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};
