"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { Wind } from "lucide-react";
import { CloudSun } from "lucide-react";



import {
  Home,
  Cloud,
  Bot,
  Map,
  Bell,
  Settings,
  BarChart3,
  AlertTriangle,
  Trees,
  Building2,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="
      fixed
      left-0
      top-0
      h-screen
      w-[250px]
      bg-[#041325]
      border-r
      border-blue-900/30
      flex
      flex-col
      z-50
      text-white
      "
    >
      {/* LOGO */}
      <div className="px-5 pt-5">
        <div className="flex items-start gap-3">
          <Image
            src="/images/logo.png"
            alt="logo"
            width={48}
            height={48}
            className="rounded-lg"
          />

          <div>
            <h1 className="text-[20px] font-bold leading-none">WeatherGPT</h1>

            <p className="text-xs text-gray-400 mt-1">
              AI Climate Intelligence Platform
            </p>

            <p className="text-[10px] text-gray-500 mt-1">
              For a Safer, Smarter, Greener India
            </p>
          </div>
        </div>
      </div>

      {/* MENU */}
      <div className="flex-1 overflow-y-auto mt-8 px-3 space-y-1">
        <Link href="/">
          <SidebarItem
            active={pathname === "/"}
            icon={<Home size={18} />}
            text="Dashboard"
          />
        </Link>

        <Link href="/weather-now">
  <SidebarItem
    active={pathname === "/weather-now"}
    icon={<CloudSun size={18} />}
    text="Weather Now"
  />
</Link>

       

        <Link href="/ai-assistantx">
  <SidebarItem
    active={pathname === "/ai-assistantx"}
    icon={<Bot size={18} />}
    text="AI Assistant"
  />
</Link>

        <Link href="/farmer-advisory">
          <SidebarItem
            active={pathname === "/farmer-advisory"}
            icon={<Trees size={18} />}
            text="Farmer Advisory"
          />
        </Link>

        <Link href="/disaster-alerts">
          <SidebarItem
            active={pathname === "/disaster-alerts"}
            icon={<AlertTriangle size={18} />}
            text="Disaster Alerts"
          />
        </Link>

        <Link href="/risk-maps">
          <SidebarItem
            active={pathname === "/risk-maps"}
            icon={<Map size={18} />}
            text="Risk Maps"
          />
        </Link>
        <Link href="/air-quality">
  <SidebarItem
    active={pathname === "/air-quality"}
    icon={<Wind size={18} />}
    text="Air Quality"
  />
</Link>

       <Link href="/climate-analytics">
  <SidebarItem
    active={
      pathname === "/climate-analytics"
    }
    icon={<BarChart3 size={18} />}
    text="Climate Analytics"
  />
</Link>

        <Link href="/government-dashboard">
  <SidebarItem
    active={
      pathname === "/government-dashboard"
    }
    icon={<Building2 size={18} />}
    text="Government Dashboard"
  />
</Link>

        <SidebarItem icon={<Bell size={18} />} text="Notifications" badge="3" />

        <SidebarItem icon={<Settings size={18} />} text="Settings" />
      </div>

      {/* FOOTER */}
      <div className="p-4 border-t border-blue-900/20">
        <div
          className="
          rounded-2xl
          overflow-hidden
          bg-[#0A203D]
          border
          border-blue-900/30
          "
        >
          <Image
            src="/images/climate-card.jpg"
            alt="climate"
            width={400}
            height={200}
          />

          <div className="p-3">
            <p className="text-sm font-semibold leading-tight">
              Together for a
            </p>

            <p className="text-sm font-semibold leading-tight">
              Climate Resilient India
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-4">
          <Image
            src="/images/ministry.png"
            alt="ministry"
            width={45}
            height={45}
            className="w-auto h-auto"
          />

          <div>
            <p className="text-xs font-medium">Ministry of Earth Sciences</p>

            <p className="text-[11px] text-gray-400">Government of India</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

function SidebarItem({ icon, text, active = false, badge }: any) {
  return (
    <div
      className={`
      flex
      items-center
      justify-between
      px-4
      py-3
      rounded-xl
      cursor-pointer
      transition-all

      ${
        active
          ? "bg-green-600 border border-green-400 text-white shadow-lg shadow-green-500/20"
          : "hover:bg-white/5"
      }
      `}
    >
      <div className="flex items-center gap-3">
        {icon}

        <span className="text-sm">{text}</span>
      </div>

      {badge && (
        <div
          className="
          h-5
          w-5
          rounded-full
          bg-red-500
          flex
          items-center
          justify-center
          text-[10px]
          "
        >
          {badge}
        </div>
      )}
    </div>
  );
}
