import { StatusBar } from "expo-status-bar";
import styled from "styled-components";
import { SafeAreaView } from "react-native-safe-area-context";
import { BooksContextProvider } from "./src/services/books/books.context";
import { LibraryContextProvider } from "./src/services/library/library.context";
import { Navigator } from "./src/infastructure/navigation";

const Container = styled(SafeAreaView)`
  flex: 1;
`;

export const App = () => {
  return (
    <Container>
      <BooksContextProvider>
        <LibraryContextProvider>
          <Navigator />
        </LibraryContextProvider>
      </BooksContextProvider>
      <StatusBar style="auto" />
    </Container>
  );
};
