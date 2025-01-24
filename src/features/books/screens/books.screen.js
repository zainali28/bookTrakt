import { useEffect, useState } from "react";
import { Searchbar, ActivityIndicator } from "react-native-paper";
import { SafeAreaView, StatusBar, FlatList, View, Text } from "react-native";
import styled from "styled-components";
import { BookCard } from "../components/book.component";

const BooksContainer = styled(SafeAreaView)`
  flex: 1;
  margin-bottom: 10px;
`;

const ItemContainer = styled(View)`
  flex: 1;
  margin: 5px;
`;

const Search = styled(Searchbar)`
  margin: 8px;
`;

export const BooksScreen = () => {
  const [searchQuery, setSearchQuery] = useState("harry potter");
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const apiKey = "AIzaSyBX2LUFtftBg47PV1rnNrsZhIzmBAwEj58";

  const search = async (page = 0) => {
    setLoading(true);
    const formattedQuery = searchQuery.toLowerCase().replace(/ /g, "+");
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${formattedQuery}&key=${apiKey}&startIndex=${
        page * 10
      }&maxResults=10`
    )
      .then((r) => r.json())
      .then((data) => {
        setBooks((prevBooks) => [...prevBooks, ...(data.items || [])]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    setBooks([]); // Clear books when search query changes
    setPage(0); // Reset page to 0
    search(0); // Fetch first page
    console.log(searchQuery);
  }, [searchQuery]);

  const loadMore = () => {
    if (!loading) {
      const nextPage = page + 1;
      setPage(nextPage);
      search(nextPage);
    }
  };

  return (
    <BooksContainer>
      <Search
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      {books && (
        <FlatList
          data={books}
          numColumns={3}
          renderItem={({ item }) => (
            <ItemContainer>
              <BookCard
                key={`${item.id}-${item.etag}`}
                thumbnail={
                  item.volumeInfo.imageLinks?.thumbnail
                    ? item.volumeInfo.imageLinks.thumbnail.replace(
                        "http://",
                        "https://"
                      )
                    : null
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
