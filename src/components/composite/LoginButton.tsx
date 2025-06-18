import { useAuth } from "react-oidc-context";
import { Button } from "../ui/button";

export const LoginButton = () => {
  const { isAuthenticated, signinRedirect, user, removeUser } = useAuth();
  return (
    <Button
      variant={isAuthenticated ? "destructive" : "outline"}
      className="w-full bg-gray-700 hover:bg-gray-600 text-gray-100 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors"
      onClick={async () => {
        const action = isAuthenticated ? removeUser : signinRedirect;
        await action();
      }}
    >
      {isAuthenticated
        ? "Hello, " + user?.profile.email?.split("@")[0] || "Logout"
        : "Login to upload an image"}
    </Button>
  );
};
