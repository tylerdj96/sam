import axios from "axios";
import {
  CharacterList,
  CharacterRender,
  CharacterAppearance,
  CharacterEquipment,
  Character
} from "./interfaces/characters";
import { PvpBracketStatistics } from "./interfaces/pvp";

const PROFILE_NAMESPACE = "profile-us";
// const REGION = "us";
const LOCALE = "en_US";

const basicParams = {
  namespace: PROFILE_NAMESPACE,
  // REGION,
  locale: LOCALE
};

export const getCharacterList = async (
  accessToken: string
): Promise<CharacterList | undefined> => {
  try {
    const characters = await axios.get<CharacterList>(
      "https://us.api.blizzard.com/profile/user/wow",
      {
        params: {
          ...basicParams,
          access_token: accessToken
        }
      }
    );
    return characters.data;
  } catch (error) {
    // console.error(error);
  }
};

export const getCharacter = async (
  accessToken: string,
  realmSlug: string = "tichondrius",
  characterName: string
): Promise<Character | undefined> => {
  try {
    const characters = await axios.get<Character>(
      `https://us.api.blizzard.com/profile/wow/character/${realmSlug}/${characterName.toLowerCase()}`,
      {
        params: {
          ...basicParams,
          access_token: accessToken
        }
      }
    );
    return characters.data;
  } catch (error) {
    // console.error(error);
  }
};

export enum RenderTypes {
  Avatar = "avatar",
  Bust = "inset",
  Main = "main"
}

export const buildFallbackUri = (
  raceId: number | string,
  genderId: string,
  renderType = RenderTypes.Main
) => {
  return `https://render-us.worldofwarcraft.com/character/tichondrius/00/000000000-${renderType}.jpg?alt=/shadow/avatar/${raceId}-${
    genderId === "FEMALE" ? "1" : "0"
  }.jpg`;
};

export const getCharacterRender = async (
  accessToken: string,
  realmSlug: string,
  characterName: string
): Promise<CharacterRender | undefined> => {
  try {
    const render = await axios.get<CharacterRender>(
      `https://us.api.blizzard.com/profile/wow/character/${realmSlug}/${characterName.toLowerCase()}/character-media`,
      {
        params: {
          ...basicParams,
          access_token: accessToken
        }
      }
    );
    return render.data;
  } catch (error) {
    console.error(error);
    return;
  }
};

export enum ArenaBrackets {
  twos = "2v2",
  threes = "3v3"
}

export const getPvpBracketStats = async (
  accessToken: string,
  realmSlug: string,
  characterName: string,
  bracket: ArenaBrackets
): Promise<PvpBracketStatistics | undefined> => {
  try {
    const render = await axios.get<PvpBracketStatistics>(
      `https://us.api.blizzard.com/profile/wow/character/${realmSlug}/${characterName.toLowerCase()}/pvp-bracket/${bracket}`,
      {
        params: {
          ...basicParams,
          access_token: accessToken
        }
      }
    );
    return render.data;
  } catch (error) {
    console.error(error);
    return;
  }
};

export const getCharacterAppearance = async (
  accessToken: string,
  realmSlug: string,
  characterName: string
): Promise<CharacterAppearance | undefined> => {
  try {
    const appearance = await axios.get<CharacterAppearance>(
      `https://us.api.blizzard.com/profile/wow/character/${realmSlug}/${characterName.toLowerCase()}/appearance`,
      {
        params: {
          ...basicParams,
          access_token: accessToken
        }
      }
    );
    return appearance.data;
  } catch (error) {
    console.error(error);
    return;
  }
};

export const getCharacterEquipment = async (
  accessToken: string,
  realmSlug: string,
  characterName: string
): Promise<CharacterEquipment | undefined> => {
  try {
    const equipment = await axios.get<CharacterEquipment>(
      `https://us.api.blizzard.com/profile/wow/character/${realmSlug}/${characterName.toLowerCase()}/equipment`,
      {
        params: {
          ...basicParams,
          access_token: accessToken
        }
      }
    );
    return equipment.data;
  } catch (error) {
    console.error(error);
    return;
  }
};
