import Link from "next/link";
import React from "react";
import { Button } from "../../ui/button";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { UserNav } from "./userNav";

const Navbar = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <nav className="sticky top-0 z-30 flex h-16 items-center gap-10 border-b bg-background/60 px-4 backdrop-blur-xl transition-all">
      <Link href="/" className="flex items-center space-x-2">
        <span className="inline-block font-urban text-xl font-bold">
          ✦ Dawn
        </span>
      </Link>
      <div className="ml-auto flex items-center space-x-4">
        {user ? (
          <UserNav
            email={user.email as string}
            name={user.given_name as string}
            userImage={
              user.picture ?? `https://avatar.vercel.sh/${user.given_name}`
            }
          />
        ) : (
          <Button className="relative  font-urban font-bold" asChild>
            <LoginLink>Sign In</LoginLink>
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
