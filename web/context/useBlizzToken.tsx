import constate from "constate";
import { useEffect, useState } from "react";
import { getAccessToken } from "../api/clients/auth-client";
import {
  openAuthSessionAsync,
  WebBrowserRedirectResult,
} from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import { Platform, Linking } from "react-native";
import { config } from "../common/config";

const useBlizzToken = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [accessToken, setAccessToken] = useState<string>();

  //TOKEN is not properly exchanged see https://github.com/expo/expo/issues/8300
  const discovery = {
    authorizationEndpoint: "https://us.battle.net/oauth/authorize",
    tokenEndpoint: "https://us.battle.net/oauth/token",
  };
  const useProxy = Platform.select({ web: false, default: true });

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: config.client_id,
      scopes: ["wow.profile"],
      // For usage in managed apps using the proxy
      redirectUri: AuthSession.makeRedirectUri({
        // For usage in bare and standalone
        // Use your FBID here. The path MUST be `authorize`.
        // native: `fb${FB_APP_ID}://authorize`,
        useProxy,
        native: "exp://",
      }),
      extraParams: {
        // Use `popup` on web for a better experience
        display: Platform.select({ web: "popup" })!,
        // Optionally you can use this to rerequest declined permissions
        auth_type: "rerequest",
      },
      // NOTICE: Please do not actually request the token on the client (see:
      // response_type=token in the authUrl), it is not secure. Request a code
      // instead, and use this flow:
      // https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow/#confirm
      // The code here is simplified for the sake of demonstration. If you are
      // just prototyping then you don't need to concern yourself with this and
      // can copy this example, but be aware that this is not safe in production.
      responseType: AuthSession.ResponseType.Token,
    },
    discovery
  );

  useEffect(() => {
    const loadToken = async () => {
      console.log(request);
      console.log(response);
      const result = await promptAsync({ useProxy });
      console.log(result);
    };

    if (!accessToken && request) loadToken();
  }, [request]);

  return { loading, accessToken };
};

export const [BlizzApiProvider, useBlizzContext] = constate(useBlizzToken);
