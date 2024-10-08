"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { Button } from "../../ui/button";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useConvexAuth, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import useUserStore from "@/store/userStore";
import { LogIn } from "lucide-react";

const Navbar = () => {
  const { isAuthenticated } = useConvexAuth();
  const addUser = useMutation(api.user.addUser);
  const { setCurrentUserId } = useUserStore();

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
    addUser({}).then((id) => {
      // console.log(id);
      setCurrentUserId(id);
    });
  }, [addUser, isAuthenticated, setCurrentUserId]);

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
          <Link href={"/sign-in"}>
            <Button className="font-urban font-bold" variant={"outline"}>
              <LogIn className="mr-2 h-4 w-4" />
              Sign In
            </Button>
          </Link>
        </SignedOut>
      </div>
    </div>
  );
};

export default Navbar;
