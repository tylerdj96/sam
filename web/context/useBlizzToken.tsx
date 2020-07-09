import constate from "constate";
import { useEffect, useState } from "react";
import { getAccessToken } from "../api/clients/auth-client";

const useBlizzToken = ({ token }: { token: string }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string>(token);
  return { loading, accessToken };
};

export const [BlizzApiProvider, useBlizzContext] = constate(useBlizzToken);
