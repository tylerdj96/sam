import React from "react";
import { View, ActivityIndicator } from "react-native";

export const FullScreenLoading = () => {
  return (
    <View style={{ display: "flex", width: "100%", height: "100%" }}>
      <ActivityIndicator
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center"
        }}
        size="large"
        color="#0000ff"
      />
    </View>
  );
};
