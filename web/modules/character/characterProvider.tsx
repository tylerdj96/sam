import "react-native-gesture-handler";
import React, { createContext, FC } from "react";
import { CharacterOption } from "../characterList";
import {
  CharacterRender,
  CharacterSummary,
  BaseCharacterSummary,
  Character
} from "../../api/clients/interfaces/characters";

export const CharacterProvider: FC<{ option: CharacterOption }> = ({
  option,
  children
}) => {
  return (
    <CharacterContext.Provider
      value={{
        char: option.char,
        render: option.render,
        fallback: option.fallback
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};

export const CharacterContext = createContext({
  char: {} as BaseCharacterSummary | Character,
  render: {} as CharacterRender | undefined,
  fallback: ""
});
