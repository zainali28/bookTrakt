import { useContext, useState } from "react";
import { LibraryContext } from "../../../services/library/library.context";
import styled from "styled-components";
import { BookCard } from "../../books/components/book.component";
import { ActivityIndicator } from "react-native-paper";
import { SafeAreaView, View, useWindowDimensions } from "react-native";
import { StatusBar } from "react-native";
import { FlatList } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

const BooksContainer = styled(SafeAreaView)`
  flex: 1;
  background-color: white;
`;

const ItemContainer = styled.View`
  height: 200px;
  width: 120px;
  margin: 5px;
`;

const Library = ({ library, navigation }) => {
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
    </BooksContainer>
  );
};

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#673ab7" }} />
);

export const LibraryScreen = ({ navigation }) => {
  const { library } = useContext(LibraryContext);

  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const routes = [
    { key: "first", title: "All" },
    { key: "second", title: "Reading" },
    { key: "third", title: "Completed" },
    { key: "fourth", title: "On Hold" },
    { key: "fifth", title: "Dropped" },
    { key: "sixth", title: "Plan to Read" },
  ];

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return <Library navigation={navigation} library={library} />;
      case "second":
        return <SecondRoute />;
      case "third":
        return <SecondRoute />;
      case "fourth":
        return <SecondRoute />;
      case "fifth":
        return <SecondRoute />;
      case "sixth":
        return <SecondRoute />;
      default:
        return null;
    }
  };

  return (
    <BooksContainer>
      <TabView
        renderTabBar={(props) => <TabBar {...props} scrollEnabled />}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      ></TabView>
    </BooksContainer>
  );
};
