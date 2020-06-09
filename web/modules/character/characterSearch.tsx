import React from "react";
import {
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CharacterOption } from "../characterList";
import { SearchBar } from "react-native-elements";
import {
  getCharacter,
  getCharacterRender,
  buildFallbackUri,
  RenderTypes
} from "../../api/clients/profile-client";
import { useBlizzContext } from "../../context/useBlizzToken";

interface SearchBarProps {
  searchValue: string | undefined;
  setSearchValue: (val: string) => void;
}

export const CharacterSearch = ({
  searchValue,
  setSearchValue
}: SearchBarProps) => {
  const navigator = useNavigation();
  const { accessToken } = useBlizzContext();

  const loadCharacter = async () => {
    if (accessToken && searchValue) {
      try {
        const p1 = getCharacter(accessToken, undefined, searchValue);
        const p2 = getCharacterRender(accessToken!, "tichondrius", searchValue);
        const [char, render] = await Promise.all([p1, p2]);
        let charObject: CharacterOption | undefined;
        if (char)
          charObject = {
            char,
            render,
            fallback: buildFallbackUri(
              char.race.id,
              char.gender.type,
              RenderTypes.Avatar
            )
          };
        return charObject;
      } catch (error) {
        console.error(error);
      }
    }
  };

  const navigate = async (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => {
    const opt = await loadCharacter();
    console.log(opt);
    if (opt) navigator.navigate("Character", { opt });
  };

  return (
    <SearchBar
      placeholder="Character name..."
      onChangeText={setSearchValue}
      value={searchValue}
      onSubmitEditing={navigate}
    />
  );
};
