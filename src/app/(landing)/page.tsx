import { Button } from "@/components/ui/button";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Balancer from "react-wrap-balancer";

export default async function Home() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
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
            {user ? (
              <Button className="font-urban font-bold" asChild>
                <LoginLink>Get started</LoginLink>
              </Button>
            ) : (
              <Button className="font-urban font-bold" asChild>
                <RegisterLink>Get started</RegisterLink>
              </Button>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
