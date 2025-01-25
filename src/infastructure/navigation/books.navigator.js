import { createStackNavigator } from "@react-navigation/stack";
import { BooksScreen } from "../../features/books/screens/books.screen";
import { BookInfoScreen } from "../../features/books/screens/book-info.screen";

const BooksStack = createStackNavigator();

export const BooksNavigator = () => {
  return (
    <BooksStack.Navigator screenOptions={{ headerShown: false }}>
      <BooksStack.Screen name="BookList" component={BooksScreen} />
      <BooksStack.Screen name="BookInfo" component={BookInfoScreen} />
    </BooksStack.Navigator>
  );
};
