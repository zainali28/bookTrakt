import { useContext } from "react";
import { LibraryContext } from "../../../services/library/library.context";
import styled from "styled-components";
import { BookCard } from "../../books/components/book.component";
import { ActivityIndicator } from "react-native-paper";
import { SafeAreaView } from "react-native";
import { StatusBar } from "react-native";
import { FlatList } from "react-native";

const BooksContainer = styled(SafeAreaView)`
  flex: 1;
  background-color: white;
`;

const ItemContainer = styled.View`
  height: 200px;
  width: 120px;
  margin: 5px;
`;

export const LibraryScreen = ({ navigation }) => {
  const { library } = useContext(LibraryContext);

  return (
    <BooksContainer>
      {library && (
        <FlatList
          data={library}
          numColumns={3}
          renderItem={({ item }) => (
            <ItemContainer>
              <BookCard
                onPress={() =>
                  navigation.navigate("Home", {
                    screen: "BookInfo",
                    params: { book: item },
                  })
                }
                key={`${item.id}-${item.etag}`}
                thumbnail={
                  item.volumeInfo.imageLinks?.thumbnail
                    ? item.volumeInfo.imageLinks.thumbnail.replace(
                        "http://",
                        "https://"
                      )
                    : "https://picsum.photos/700"
                }
              />
            </ItemContainer>
          )}
          keyExtractor={(item) => item.id}
          // contentContainerStyle={{ paddingHorizontal: 10 }}
          // columnWrapperStyle={{ justifyContent: "space-between" }}
          //   onEndReached={loadMore}
          //   onEndReachedThreshold={0.5}
          //   ListFooterComponent={
          //     loading && <ActivityIndicator animating={true} size={50} />
          //   }
        />
      )}
      <StatusBar style="auto" />
    </BooksContainer>
  );
};
