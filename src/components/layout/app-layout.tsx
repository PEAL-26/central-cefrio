import Link from "next/link";
import Image from "next/image";
import { UserNav } from "../ui/user-nav";
import { MainNav } from "../ui/main-nav";

export function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="border-b fixed inset-x-0 top-0 z-40 bg-white">
        <div className="flex h-16 items-center px-4">
          <Link href="/" className="relative ">
            {/* <Avatar className="h-8 w-auto"> */}
            <Image
              src="/logo.png"
              alt="cefrio-logo"
              className="h-8 w-auto"
              width={115.2}
              height={32}
            />
            {/* </Avatar> */}
          </Link>
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </div>

      <main className="mt-16 overflow-y-auto h-screen-custom flex-1 p-8 ">
        {children}
        <footer className="bg-gray-900 text-white py-4 px-6 mt-8">
          <p className="text-sm">{`© ${new Date().getFullYear()} PEALSystems. All rights reserved.`}</p>
        </footer>
      </main>
    </>
  );
}
