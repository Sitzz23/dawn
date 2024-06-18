import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-30 flex h-16 items-center gap-10 border-b bg-background/60 px-4 backdrop-blur-xl transition-all">
      <Link href="/" className="flex items-center space-x-2">
        <span className="inline-block font-urban text-xl font-bold">
          ✦ Dawn
        </span>
      </Link>
      <div className="ml-auto flex items-center space-x-4">
        <Link href="/signin">
          <Button className="relative rounded-lg font-urban font-bold">
            Sign In
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
