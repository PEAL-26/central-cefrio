import { Loading } from "@/components/ui/loading";
import { Suspense } from "react";

export default async function AppHomePage() {
  return <Suspense fallback={<Loading />}></Suspense>;
}
