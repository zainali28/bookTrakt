import { createStackNavigator } from "@react-navigation/stack";
import { LibraryScreen } from "../features/library/screens/library.screen";
import { BookInfoScreen } from "../features/books/screens/book-info.screen";

const LibraryStack = createStackNavigator();

export const LibraryNavigator = () => {
  return (
    <LibraryStack.Navigator screenOptions={{ headerShown: false }}>
      <LibraryStack.Screen name="LibraryScreen" component={LibraryScreen} />
      <LibraryStack.Screen
        headerShown={true}
        name="BookInfo"
        component={BookInfoScreen}
      />
    </LibraryStack.Navigator>
  );
};
