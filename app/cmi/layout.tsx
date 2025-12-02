"use client"
import Sidebar from "@/components/Sidebar";
import { LayoutDashboard, Settings, Share, Share2, Star } from "lucide-react";
import logo from "@/public/logo.svg"
import { usePathname } from "next/navigation";
import userStore from "@/stores/UserStore";

export default function CmdLayout({ children }: { children: React.ReactNode }) {


  const pathname = usePathname();
  const pathSegment = pathname.split("/").at(-1);

  return (
    <div className="lg:flex">
      {
        (pathSegment !== "register" && pathSegment !== "login") && (
          <Sidebar
            name="Trust Hive"
            businessName={userStore.user?.business.name}
            // logo={logo.src}
            links={[
              {
                icon: <LayoutDashboard />,
                href: "/cmi/dashboard",
                label: "Dashboard",
              },
              {
                icon: <Star />,
                href: "/cmi/reviews",
                label: "Reviews"
              },
              {
                icon: <Share2 />,
                href: "/cmi/share",
                label: "Share & Collect"
              },
              {
                icon: <Settings />,
                href: "/cmi/settings",
                label: "Settings"
              }
            ]}
          />
        )
      }
      <main className={`  min-h-screen w-full font-inter ${pathSegment !== "register" && pathSegment !== "login" && "lg:flex-1 lg:ml-64 lg:p-4"}`}>{children}</main>
    </div>
  );
}
