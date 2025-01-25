import { Card, Text, Button, Avatar } from "react-native-paper";
import styled from "styled-components";
import { Image, TouchableOpacity } from "react-native";

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

const CardView = styled(Card)`
  flex: 1;
  height: 200px;
  margin: 5px;
  border-radius: 10px;
`;

export const BookCard = ({ thumbnail, onPress }) => {
  //   console.log(thumbnail);

  return (
    <CardView>
      <TouchableOpacity onPress={onPress}>
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
