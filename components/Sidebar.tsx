"use client";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ISidebarProps {
  logo?: string;
  name: string;
  businessName?: string;
  links: { label: string; href: string; icon: React.ReactNode }[];
}

const Sidebar: React.FC<ISidebarProps> = ({ logo, name, links, businessName }) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="lg:hidden flex items-center justify-between p-4 shadow-md bg-primary text-white z-30 relative font-inter">
        <div className="flex items-center gap-2">
          {logo && <img src={logo} alt="logo" className="w-8 h-8 rounded-md" />}
          <span className="font-black-han-sans text-white text-2xl text-center">
            {name}
          </span>
        </div>
        <button onClick={() => setOpen(true)}>
          <Menu className="w-7 h-7 text-white" />
        </button>
      </div>

      {/* Sidebar Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`font-inter fixed top-0 left-0 h-full w-64 bg-primary text-white shadow-lg z-50 transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            {logo && <img src={logo} alt="logo" className="w-10 h-10 rounded-md" />}
            <div className="flex flex-col">
              <span className="font-black-han-sans text-white text-2xl">
                {name}
              </span>

              {businessName && (
                <span className="text-white/80 text-sm font-light -mt-1 truncate overflow-hidden whitespace-nowrap">
                  {businessName}
                </span>
              )}
            </div>
          </div>
          <button onClick={() => setOpen(false)} className="lg:hidden">
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="mt-4 px-2 space-y-1">
          {links.map((item, idx) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={idx}
                href={item.href}
                className={`
                  flex items-center gap-3 p-3 rounded-xl transition
                  ${isActive
                    ? "bg-white text-primary font-semibold"
                    : "text-white hover:bg-white/20"
                  }
                `}
              >
                <span
                  className={isActive ? "text-primary" : "text-white"}
                >
                  {item.icon}
                </span>
                <span
                  className={`text-sm font-medium ${isActive ? "text-primary" : "text-white"
                    }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
