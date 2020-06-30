import { RealmList } from "./interfaces/realms";
import axios, { AxiosResponse } from "axios";

const DYNAMIC_NAMEPSACE = "dynamic-us";
// const REGION = "us";
const LOCALE = "en_US";

const basicParams = {
  namespace: DYNAMIC_NAMEPSACE,
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
