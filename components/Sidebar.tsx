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
      <div className="lg:hidden flex items-center justify-between p-4 
  bg-gradient-to-r from-black via-[#7c3aed] to-black 
  text-white backdrop-blur-xl border-b border-white/10 z-30 relative">

    <div className="flex justify-center items-center">
      {logo && (
        <img
          src={logo}
          alt="logo"
          className="w-32 max-w-full object-contain drop-shadow-2xl"
        />
      )}
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
        className={`
    fixed top-0 left-0 h-full w-64 
    bg-gradient-to-b from-black via-[#0f0f0f] to-black
    backdrop-blur-xl border-r border-white/10
    text-white shadow-2xl z-50 transition-transform duration-300
    ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
  `}
      >
        {/* Glow Accent */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#7c3aed]/30 rounded-full blur-3xl opacity-40" />

        {/* Header */}
    <div className="flex justify-center items-center pt-4">
      {logo && (
        <img
          src={logo}
          alt="logo"
          className="w-40 max-w-full object-contain drop-shadow-2xl"
        />
      )}
    </div>

        {/* Navigation */}
        <nav className="relative mt-6 px-3 space-y-2">
          {links.map((item, idx) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={idx}
                href={item.href}
                className={`
            group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
            ${isActive
                    ? "bg-[#7c3aed] text-white shadow-lg shadow-[#7c3aed]/40"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                  }
          `}
              >
                <span
                  className={`
              transition-all duration-300
              ${isActive
                      ? "text-white"
                      : "text-white/60 group-hover:text-white"
                    }
            `}
                >
                  {item.icon}
                </span>

                <span className="text-sm font-medium tracking-wide">
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
