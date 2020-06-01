import axios, { AxiosResponse } from "axios";
import { RealmList } from "./interfaces/realms";

const DYNAMIC_NAMESPACE = "dynamic-us";
// const REGION = "us";
const LOCALE = "en_US";

const basicParams = {
  namespace: DYNAMIC_NAMESPACE,
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
    console.error(error);
  }
};
