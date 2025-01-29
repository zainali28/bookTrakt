import { Card, Text, Button, Avatar } from "react-native-paper";
import styled from "styled-components";
import { Image, TouchableOpacity } from "react-native";

const CardView = styled(Card)`
  height: 200px;
  margin: 5px;
  border-radius: 10px;
`;

export const BookCard = ({ thumbnail, onPress, onHold }) => {
  //   console.log(thumbnail);

  return (
    <CardView>
      <TouchableOpacity onLongPress={onHold} onPress={onPress}>
        {thumbnail && (
          <Image
            style={{ width: "100%", height: "100%", borderRadius: 10 }}
            source={{ uri: thumbnail }}
          />
        )}
      </TouchableOpacity>
    </CardView>
  );
};
