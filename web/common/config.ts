interface Config {
  client_id: string;
  //this is the uri that an android environment expects our node redirect server to run on
  redirect_server_uri: string;
}

const local: Config = {
  client_id: "c22ce62fd8f6467bb9656f2fa971ac35",
  redirect_server_uri: "https://redirect-tdj-test-l.azurewebsites.net/redirect",
  // redirect_server_uri: "http://10.0.2.2:3000/redirect",
};

export const config = local;
