import constate from "constate";
import { useEffect, useState } from "react";
import { getAccessToken } from "../api/clients/auth-client";

const useBlizzToken = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [accessToken, setAccessToken] = useState<string>();

  useEffect(() => {
    const loadToken = async () => {
      setLoading(true);
      const result = await getAccessToken();
      setAccessToken(result);
      setLoading(false);
    };

    if (!accessToken) loadToken();
  }, []);

  return { loading, accessToken };
};

export const [BlizzApiProvider, useBlizzContext] = constate(useBlizzToken);
