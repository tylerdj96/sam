import "react-native-gesture-handler";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { CharacterOption } from "../characterList";
import { MainCharRender } from "./mainCharRender";
import { PvpInfo } from "./pvpInfo";
import { CharacterProvider } from "./characterProvider";
import { FullScreenLoading } from "../../common/components/loaders";
import { FontAwesome } from "@expo/vector-icons";

function isCharOpt(value: any): value is CharacterOption {
  return "char" in value && "render" in value && "fallback" in value;
}

export const CharNavigator = () => {
  const { Navigator, Screen } = createDrawerNavigator();

  const { params } = useRoute() as any;
  const option = isCharOpt(params.opt)
    ? (params.opt as CharacterOption)
    : undefined;

  if (!option) {
    return <FullScreenLoading />;
  }
  return (
    <CharacterProvider
      option={{
        char: option.char,
        render: option.render,
        fallback: option.fallback
      }}
    >
      <Navigator
        drawerPosition="right"
        initialRouteName="Main"
        headerRight={() => (
          <FontAwesome
            name="search"
            size={24}
            color="black"
            style={{ paddingRight: 24 }}
          />
        )}
      >
        <Screen name="Main" component={MainCharRender} />
        <Screen name="PvP" component={PvpInfo} />
      </Navigator>
    </CharacterProvider>
  );
};
