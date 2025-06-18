import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "react-oidc-context";
import App from "./App.tsx";

const cognitoAuthConfig = {
  authority:
    "https://cognito-idp.eu-north-1.amazonaws.com/eu-north-1_IJYxTZ6jm",
  client_id: "2cbc1hd3l8hm3js05j18t3f8ok",
  redirect_uri: "https://d3uvuh49ai1mxv.cloudfront.net/",
  response_type: "code",
  scope: "phone openid email",
};
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <App />
    </AuthProvider>
  </StrictMode>
);
