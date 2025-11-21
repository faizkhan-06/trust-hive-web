import Sidebar from "@/components/Sidebar";
import { LayoutDashboard } from "lucide-react";
import logo from "@/public/logo.svg"
import { headers } from "next/headers";

export default async function CmdLayout({ children}: { children: React.ReactNode}) {


    const headersList = await headers();
  const fullUrl = headersList.get("x-url") || "";
  const path = new URL(fullUrl).pathname;
const pathSegment = path.split("/").at(-1) 

  return (
    <div className="lg:flex">
      {
        (pathSegment !== "register" && pathSegment !== "login") && (
          <Sidebar
            name="Trust Hive"
            logo={logo.src}
            links={[
              {
                icon: <LayoutDashboard />,
                href: "/cmd/dashboard",
                label: "Dashboard",
              },
            ]}
          />
        ) 
      }
      <main className={`  min-h-screen w-full ${pathSegment !== "register" && pathSegment !== "login" && "lg:flex-1 lg:ml-64 lg:p-4"}`}>{children}</main>
    </div>
  );
}
