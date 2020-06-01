import React from "react";
import { View, Image, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import { buildFallbackUri } from "../../api/clients/profile-client";
import { CharacterOption } from "../characterList";

function isCharOpt(value: any): value is CharacterOption {
  return "char" in value && "render" in value && "fallback" in value;
}

export const MainCharRender = () => {
  const { params } = useRoute() as any;
  const opt = isCharOpt(params.opt)
    ? (params.opt as CharacterOption)
    : undefined;

  if (!opt) {
    return (
      <View>
        <Text>Error loading main render</Text>
      </View>
    );
  }
  return (
    <View>
      <Image
        style={{
          width: "100%",
          height: "100%",
        }}
        source={{ uri: opt?.render?.render_url ?? buildFallbackUri(opt?.char) }}
      />
    </View>
  );
};
