import Link from "next/link";
import React from "react";
import { Button } from "../../ui/button";
// import { UserNav } from "./userNav";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
// import { currentUser } from "@clerk/nextjs/server";

const Navbar = () => {
  // const user = await currentUser();
  return (
    <div className="sticky top-0 z-30 flex h-16 items-center gap-10 border-b bg-background/60 px-4 backdrop-blur-xl transition-all">
      <Link href="/" className="flex items-center space-x-2">
        <span className="inline-block font-urban text-xl font-bold">
          ✦ Dawn
        </span>
      </Link>
      <div className="ml-auto flex items-center space-x-4">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <Button className="font-urban font-bold" asChild>
            <SignInButton mode="modal">Sign In</SignInButton>
          </Button>
        </SignedOut>
        {/* {user ? (
          // <UserNav
          //   email={user.emailAddresses[0].emailAddress as string}
          //   name={user.fullName as string}
          //   userImage={
          //     user.imageUrl ?? `https://avatar.vercel.sh/${user.fullName}`
          //   }
          // />
        ) : (
         
        )} */}
      </div>
    </div>
  );
};

export default Navbar;
