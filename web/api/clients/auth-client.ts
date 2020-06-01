import {
  openAuthSessionAsync,
  WebBrowserRedirectResult,
} from "expo-web-browser";
import { config } from "../../common/config";

const buildAuthorizeUri = (
  client_id: string,
  redirect_uri: string,
  scope: string
) => {
  return `https://us.battle.net/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&response_type=code&response_mode=form_post&nonce=ygkgon6zguh`;
};

//I hate everything about this method
//Expo authentication would be ideal here, but gets confused because I am not able to pass a non http redirect URI to Blizzards Api
//So i configured a redirect server that redirects back to us, and thus have to manually build a request to the authorize uri
// since the redirect always comes back as a 'dismiss' using expo
export const getAccessToken = async () => {
  try {
    const result = (await openAuthSessionAsync(
      buildAuthorizeUri(
        config.client_id,
        config.redirect_server_uri,
        "wow.profile"
      ),
      ""
    )) as WebBrowserRedirectResult;
    console.log(result);

    const regex = /access_token=([A-Za-z0-9]*)\&/;
    const params = result.url.match(regex);
    console.log(params);
    const accessToken = params?.[1] ?? "";

    return accessToken;
  } catch (error) {
    console.log("FAILED TO RETRIEVE ACCESS TOKEN!!!");
    console.log(error);
  }
};
