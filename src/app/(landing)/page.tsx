"use client";

import Balancer from "react-wrap-balancer";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-5 text-center">
          <h1 className=" text-4xl font-heading font-extrabold tracking-tight  sm:text-5xl md:text-6xl lg:text-7xl">
            <Balancer>
              Coding contests are competitive now, its{" "}
              <span className="relative bg-gradient-to-r from-indigo-500 to-purple-500/80 bg-clip-text font-extrabold text-transparent">
                Dawn
              </span>
            </Balancer>
          </h1>
          <p className="max-w-[45rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8 font-figtree">
            <Balancer>
              Enter the exhilarating world where coding meets competition in
              virtual arenas that host real-time challenges against fellow
              coders from around the globe
            </Balancer>
          </p>
          <div className="flex  justify-center space-x-2  md:space-x-4">
            <button className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px font-semibold leading-6  text-white inline-block">
              <span className="absolute inset-0 overflow-hidden rounded-full">
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/0 via-violet-500/90 to-purple-500/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
              </span>
              <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-2 px-4 ring-1 ring-white/10 ">
                <Link href="/dashboard">Dashboard</Link>
              </div>
              <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-indigo-500/0 via-violet-400/90 to-purple-500/0 transition-opacity duration-500 group-hover:opacity-40"></span>
            </button>

            {/* <SignedOut>
              <button className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px font-semibold leading-6  text-white inline-block">
                <span className="absolute inset-0 overflow-hidden rounded-full">
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/0 via-violet-500/90 to-purple-500/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                </span>
                <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-2 px-4 ring-1 ring-white/10 ">
                  <SignUpButton mode="modal">Get started</SignUpButton>
                </div>
                <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-indigo-500/0 via-violet-400/90 to-purple-500/0 transition-opacity duration-500 group-hover:opacity-40"></span>
              </button>
            </SignedOut> */}
          </div>
        </div>
      </section>
    </>
  );
}
