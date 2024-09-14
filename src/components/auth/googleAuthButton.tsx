"use client";

import { Google } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { Loader } from "../shared/loader";

type GoogleAuthButtonProps = {
  method: "signup" | "signin";
};

export const GoogleAuthButton = ({ method }: GoogleAuthButtonProps) => {
  //   const { signUpWith, signInWith } = useGoogleAuth();
  return (
    <Button
      {...(method === "signin"
        ? {
            // onClick: () => signInWith("oauth_google"),
          }
        : {
            // onClick: () => signUpWith("oauth_google"),
          })}
      className="w-full rounded-xl flex gap-3 bg-themeBlack border-themeGray"
      variant="outline"
    >
      <Loader loading={false}>
        <Google />
        Google
      </Loader>
    </Button>
  );
};
