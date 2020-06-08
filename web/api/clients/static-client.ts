import axios, { AxiosResponse } from "axios";
import { RealmList } from "./interfaces/realms";
import { ItemMedia } from "./interfaces/items";

const STATIC_NAMESPACE = "static-us";
// const REGION = "us";
const LOCALE = "en_US";

const basicParams = {
  namespace: STATIC_NAMESPACE,
  // REGION,
  locale: LOCALE,
};

export const getRealms = async (
  accessToken: string
): Promise<RealmList | undefined> => {
  try {
    const realms = await axios.get<RealmList>(
      "https://us.api.blizzard.com/data/wow/realm/index",
      {
        params: {
          ...basicParams,
          access_token: accessToken,
        },
      }
    );
    return realms.data;
  } catch (error) {
    // console.error(error);
  }
};

export const getItemMedia = async (
  accessToken: string,
  itemId: number | undefined
): Promise<ItemMedia | undefined> => {
  if (itemId) {
    try {
      const media = await axios.get<ItemMedia>(
        `https://us.api.blizzard.com/data/wow/media/item/${itemId.toString()}`,
        {
          params: {
            ...basicParams,
            access_token: accessToken,
          },
        }
      );
      return media.data;
    } catch (error) {
      // console.error(error);
    }
  }
};
