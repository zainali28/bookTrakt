"use client";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { fetch } from "expo/fetch";
import { BooksScreen } from "./src/features/books/screens/books.screen";
import styled from "styled-components";
import { SafeAreaView } from "react-native-safe-area-context";

const Container = styled(SafeAreaView)`
  flex: 1;
`;

export const App = () => {
  return (
    <Container>
      <BooksScreen />
      <StatusBar style="auto" />
    </Container>
  );
};
