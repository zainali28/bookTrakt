import * as React from "react";
import { useState } from "react";
import { Image, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { Text, TouchableRipple } from "react-native-paper";
import { SafeAreaView, ScrollView } from "react-native";

const InfoContainer = styled(SafeAreaView)`
  background-color: white;
  flex: 1;
`;

const BookInfo = styled(SafeAreaView)`
  flex: 1;
`;

const Title = styled(Text).attrs({ variant: "titleLarge" })`
  margin-top: 24px;
  font-weight: bold;
`;

const Label = styled(Text).attrs({ variant: "labelSmall" })`
  margin: 2px;
`;

const LabelHead = styled(Text).attrs({ variant: "labelMedium" })`
  font-weight: bold;
  margin-top: 6px;
`;

const Body = styled(Text).attrs({ variant: "bodyLarge" })``;

const DetailsContainer = styled(SafeAreaView)`
  flex-direction: row;
`;

const ImageContainer = styled.View`
  margin: 24px;
  width: 100px;
  height: 200px;
  border-radius: 10px;
`;

const Cover = styled(Image)`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;

const MainBody = styled(ScrollView)`
  margin: 12px;
`;

export const BookInfoScreen = ({ route }) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const {
    book: {
      id,
      volumeInfo: {
        description,
        title,
        authors,
        publisher,
        publishedDate,
        imageLinks: { thumbnail },
      },
    },
  } = route.params;

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const shouldShowToggle = description.length > 130; // Adjust the length as needed

  return (
    <InfoContainer>
      <DetailsContainer>
        <TouchableOpacity>
          <ImageContainer>
            <Cover
              source={{
                uri: thumbnail ? thumbnail : "https://picsum.photos/700",
              }}
            />
          </ImageContainer>
        </TouchableOpacity>
        <BookInfo>
          <Title>{title}</Title>
          <LabelHead>Authors:</LabelHead>
          {authors.map((v, i) => (
            <Label key={`${i}-${id}`}>{v}</Label>
          ))}
          <LabelHead>Publisher:</LabelHead>
          <Label>{publisher}</Label>
          <LabelHead>Published Date:</LabelHead>
          <Label>{publishedDate}</Label>
        </BookInfo>
      </DetailsContainer>
      <MainBody>
        <LabelHead>Description:</LabelHead>
        <TouchableRipple onPress={toggleDescription}>
          <>
            <Body numberOfLines={isDescriptionExpanded ? undefined : 3}>
              {description}
            </Body>
            {shouldShowToggle && (
              <Label>{isDescriptionExpanded ? "Show Less" : "Show More"}</Label>
            )}
          </>
        </TouchableRipple>
      </MainBody>
    </InfoContainer>
  );
};
