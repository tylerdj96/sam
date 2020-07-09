import "react-native-gesture-handler";
import { View, Platform } from "react-native";
import { Button } from "react-native-elements";
import React, { useState } from "react";
import Main from "./Main";
import { BlizzApiProvider } from "./web/context/useBlizzToken";
import * as AuthSession from "expo-auth-session";
import { config } from "./web/common/config";
import { maybeCompleteAuthSession } from "expo-web-browser";
import axios from "axios";
import { acc } from "react-native-reanimated";

maybeCompleteAuthSession();

export default function App() {
  const [accessToken, setAccessToken] = useState<string>();

  //TOKEN is not properly exchanged see https://github.com/expo/expo/issues/8300
  const discovery = {
    authorizationEndpoint: "https://us.battle.net/oauth/authorize",
    tokenEndpoint: "https://us.battle.net/oauth/token",
  };
  const useProxy = Platform.select({ web: false, default: true });

  const temp = AuthSession.makeRedirectUri({
    // For usage in bare and standalone
    // Use your FBID here. The path MUST be `authorize`.
    // native: `fb${FB_APP_ID}://authorize`,
    useProxy,
    native: "exp://",
  });

  console.log(temp);

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: config.client_id,
      scopes: ["wow.profile"],
      // For usage in managed apps using the proxy
      redirectUri: temp,
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
      responseType: AuthSession.ResponseType.Code,
    },
    discovery
  );

  const onPress = async () => {
    const result: any = await promptAsync({ useProxy });
    console.log(result);
    const code = result.params?.code ?? "null";
    const response = await axios.get(
      `https://redirect-tdj-test-l.azurewebsites.net/token?code=${code}&source=${
        useProxy ? "mobile" : "web"
      }`
    );
    const access_token = response.data.access_token;
    console.log(response);
    if (access_token) setAccessToken(access_token);
  };

  if (!accessToken) {
    return (
      <View
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button title="Login" onPress={onPress} />
      </View>
    );
  }

  return (
    <BlizzApiProvider token={accessToken}>
      <Main />
    </BlizzApiProvider>
  );
}
