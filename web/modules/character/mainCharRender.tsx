import React from "react";
import { View, Image, Text } from "react-native";

export const MainCharRender = ({ uri }: { uri: string }) => {
  return (
    <View>
      <Image
        style={{
          width: "100%",
          height: "100%",
        }}
        source={{ uri }}
      />
    </View>
  );
};
