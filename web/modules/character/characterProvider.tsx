import "react-native-gesture-handler";
import React, { useContext, createContext, FC } from "react";
import { useRoute, useLinkProps } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { CharacterOption } from "../characterList";
import { MainCharRender } from "./mainCharRender";
import { buildFallbackUri } from "../../api/clients/profile-client";
import { View, ActivityIndicator } from "react-native";
import { PvpInfo } from "./pvpInfo";
import {
  CharacterRender,
  Character,
} from "../../api/clients/interfaces/characters";

export const CharacterProvider: FC<{ option: CharacterOption }> = ({
  option,
  children,
}) => {
  return (
    <CharacterContext.Provider
      value={{
        char: option.char,
        render: option.render,
        fallback: option.fallback,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};

export const CharacterContext = createContext({
  char: {} as Character,
  render: {} as CharacterRender | undefined,
  fallback: "",
});
