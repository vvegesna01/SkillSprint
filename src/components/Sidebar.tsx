"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Briefcase,
  Bookmark,
  FileSearch,
  User,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { cn } from "cn";

export function Sidebar() {
  const pathname = usePathname();

  const navigation = [
    {
      label: "Discover",
      items: [
        { name: "Analyze", href: "/analyze", icon: FileSearch },
        { name: "Projects", href: "/projects", icon: Briefcase },
        { name: "My Projects", href: "/my-projects", icon: Bookmark },
      ],
    },
    {
      label: "Main",
      hideLabel: true,
      items: [
        { name: "Profile", href: "/profile", icon: User },
      ],
    },
  ];

  return (
    <div className="flex flex-col h-screen w-[260px] border-r border-gray-200 bg-[#FAFAFA] flex-shrink-0">
      {/* Logo */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-[#4F46E5] rounded-xl flex items-center justify-center shadow-sm">
          <span className="text-white font-bold text-lg leading-none">S</span>
        </div>
        <span className="font-bold text-xl text-gray-900 tracking-tight">SkillSprint</span>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-6">
        {navigation.map((group, i) => (
          <div key={i} className="space-y-1">
            {!group.hideLabel && (
              <h3 className="px-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
                {group.label}
              </h3>
            )}
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-[14px] font-medium transition-colors",
                      isActive
                        ? "bg-[#EEF2FF] text-[#4F46E5]"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    )}
                  >
                    <item.icon
                      className={cn(
                        "w-[18px] h-[18px]",
                        isActive ? "text-[#4F46E5]" : "text-gray-400"
                      )}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Collapse button mock */}
      <div className="px-4 flex justify-end absolute left-[245px] top-[80vh]">
        <button className="w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 shadow-sm z-10">
          <ChevronLeft className="w-[14px] h-[14px]" />
        </button>
      </div>

      {/* User snippet */}
      <div className="p-3 border border-gray-200 m-4 rounded-xl bg-white shadow-sm flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#EEF2FF] flex items-center justify-center text-[#4F46E5] font-semibold text-sm">
            K
          </div>
          <span className="text-sm font-medium text-gray-900">Keerthana</span>
        </div>
        <ChevronRight className="w-4 h-4 text-gray-400" />
      </div>
    </div>
  );
}
