import { Loading } from "@/components/ui/loading";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Home",
};

export default async function MailsHomePage() {
  return <Suspense fallback={<Loading />}></Suspense>;
}
