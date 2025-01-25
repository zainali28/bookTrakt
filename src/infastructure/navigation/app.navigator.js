import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BooksScreen } from "../../features/books/screens/books.screen";
import { Ionicons } from "@expo/vector-icons";
import { BooksNavigator } from "./books.navigator";

const AppTab = createBottomTabNavigator();

const TAB_ICON = {
  Home: "home",
  Discover: "discover",
  Library: "library",
  Settings: "settings",
};

const createScreenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => (
    <Ionicons
      name={TAB_ICON[route.name] + (focused ? "" : "-outline")}
      size={size}
      color={color}
    />
  ),
  tabBarActiveTintColor: "blue",
  tabBarInactiveTintColor: "gray",
  headerShown: false,
});

export const AppNavigator = () => {
  return (
    <AppTab.Navigator screenOptions={createScreenOptions}>
      <AppTab.Screen name="Home" component={BooksNavigator} />
      <AppTab.Screen name="Discover" component={() => null} />
      <AppTab.Screen name="Library" component={() => null} />
      <AppTab.Screen name="Settings" component={() => null} />
    </AppTab.Navigator>
  );
};
