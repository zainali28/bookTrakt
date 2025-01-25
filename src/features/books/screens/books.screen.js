import { useEffect, useState, useRef, useContext } from "react";
import { Searchbar, ActivityIndicator } from "react-native-paper";
import { SafeAreaView, StatusBar, FlatList, View, Text } from "react-native";
import styled from "styled-components";
import { BookCard } from "../components/book.component";
import { BooksContext } from "../../../services/books.context";

const BooksContainer = styled(SafeAreaView)`
  flex: 1;
  margin-bottom: 10px;
  background-color: white;
`;

const ItemContainer = styled(View)`
  flex: 1;
  margin: 5px;
`;

const Search = styled(Searchbar)`
  margin: 8px;
`;

export const BooksScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  // const [books, setBooks] = useState([]);
  const [page, setPage] = useState(0);
  // const [loading, setLoading] = useState(false);

  const { books, loading, clear, search } = useContext(BooksContext);

  const apiKey = useRef(process.env.EXPO_PUBLIC_API_KEY);

  const loadMore = () => {
    if (!loading) {
      const nextPage = page + 1;
      setPage(nextPage);
      search(nextPage, searchQuery);
    }
  };

  return (
    <BooksContainer>
      <Search
        placeholder="Search"
        onChangeText={setSearchQuery}
        onSubmitEditing={() => {
          if (searchQuery) {
            clear();
            setPage(0);
            search(0, searchQuery);
          }
        }}
        onClearIconPress={() => {
          setSearchQuery(searchQuery);
        }}
        value={searchQuery}
      />
      {books && (
        <FlatList
          data={books}
          numColumns={3}
          renderItem={({ item }) => (
            <ItemContainer>
              <BookCard
                onPress={() => navigation.navigate("BookInfo", { book: item })}
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
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loading && <ActivityIndicator animating={true} size={50} />
          }
        />
      )}
      <StatusBar style="auto" />
    </BooksContainer>
  );
};
