"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Plus,
  User,
  UserCog,
  LogOut,
  Home,
  Menu,
  X,
  BarChart2
} from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import Image from "next/image";

interface SidebarUser {
  id: string;
  name?: string | null;
  email?: string | null;
  role?: string;
}

interface DashboardSidebarProps {
  user: SidebarUser;
  onSidebarHover?: (isHovered: boolean) => void;
}

export default function DashboardSidebar({
  user,
  onSidebarHover,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: Home,
      current: pathname === "/dashboard",
    },
    {
      name: "New Event",
      href: "/dashboard/events/new",
      icon: Plus,
      current: pathname === "/dashboard/events/new",
    },
  ];


  const adminNavigation =
  user.role === "ADMIN"
    ? [
        {
          name: "Manage Users",
          href: "/dashboard/users",
          icon: UserCog,
          current: pathname === "/dashboard/users",
        },
        {
          name: "Reports",
          href: "/dashboard/reports",
          icon: BarChart2,
          current: pathname === "/dashboard/reports",
        },
      ]
    : user.role === "STAFF"
    ? [
        {
          name: "Reports",
          href: "/dashboard/reports",
          icon: BarChart2,
          current: pathname === "/dashboard/reports",
        },
      ]
    : [];


  const profileNavigation = [
    {
      name: "Profile",
      href: "/dashboard/profile",
      icon: User,
      current: pathname === "/dashboard/profile",
    },
  ];

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    onSidebarHover?.(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onSidebarHover?.(false);
  };

  const DesktopSidebarContent = () => (
    <div
      className={`flex flex-col h-full bg-white shadow-lg border-r border-gray-200 transition-all duration-300 ease-in-out ${
        isHovered ? "w-64" : "w-16"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-center">
          <div className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center flex-shrink-0">
            <Image
              src="/logo5.png"
              alt="Calendar icon"
              width={36}
              height={36}
              className="text-white"
            />
          </div>
          {isHovered && (
            <div className="ml-3 overflow-hidden">
              <h2 className="text-lg font-semibold text-gray-900 whitespace-nowrap">
                Event Easy
              </h2>
            </div>
          )}
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-center">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="w-4 h-4 text-gray-600" />
          </div>
          {isHovered && (
            <div className="ml-3 flex-1 min-w-0 overflow-hidden">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user.name || user.email}
              </p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
              <div className="mt-2">
                <Badge variant="secondary" className="text-xs">
                  {user.role?.replace("_", " ")}
                </Badge>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-2 overflow-y-auto">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors group relative ${
                item.current
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {isHovered ? (
                <span className="ml-3 whitespace-nowrap">{item.name}</span>
              ) : (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 pointer-events-none">
                  {item.name}
                </div>
              )}
            </Link>
          );
        })}

        {/* Admin Navigation */}
        {adminNavigation.length > 0 && (
          <>
            {isHovered && (
              <div className="pt-4 pb-2">
                <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Administration
                </h3>
              </div>
            )}
            {adminNavigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors group relative ${
                    item.current
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {isHovered ? (
                    <span className="ml-3 whitespace-nowrap">{item.name}</span>
                  ) : (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 pointer-events-none">
                      {item.name}
                    </div>
                  )}
                </Link>
              );
            })}
          </>
        )}

        {/* Profile Navigation */}
        {isHovered && (
          <div className="pt-4 pb-2">
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Account
            </h3>
          </div>
        )}
        {profileNavigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors group relative ${
                item.current
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {isHovered ? (
                <span className="ml-3 whitespace-nowrap">{item.name}</span>
              ) : (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 pointer-events-none">
                  {item.name}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Sign Out Button */}
      <div className="p-3 border-t border-gray-200">
        <Button
          variant="outline"
          className={`w-full transition-all duration-300 group relative ${
            isHovered ? "justify-start" : "justify-center px-0"
          }`}
          onClick={() => signOut({ callbackUrl: '/' })}

        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          {isHovered ? (
            <span className="ml-2">Sign Out</span>
          ) : (
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 pointer-events-none">
              Sign Out
            </div>
          )}
        </Button>
      </div>
    </div>
  );

  const MobileSidebarContent = () => (
    <div className="flex flex-col h-full bg-white shadow-lg border-r border-gray-200">
      {/* Header */}
      <div className="p-4 lg:p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-slate-900 rounded-full flex items-center justify-center">
              <Image
                src="/logo5.png"
                alt="Calendar icon"
                width={36}
                height={36}
                className="text-white"
              />
            </div>
            <div>
              <h2 className="text-base lg:text-lg font-semibold text-gray-900">
                Event Manager
              </h2>
            </div>
          </div>
          <button
            onClick={closeMobileMenu}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 lg:p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="w-4 h-4 text-gray-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user.name || user.email}
            </p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>
        </div>
        <div className="mt-3">
          <Badge variant="secondary" className="text-xs">
            {user.role?.replace("_", " ")}
          </Badge>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 lg:p-4 space-y-1 lg:space-y-2 overflow-y-auto">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={closeMobileMenu}
              className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                item.current
                  ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span>{item.name}</span>
            </Link>
          );
        })}

        {/* Admin Navigation */}
        {adminNavigation.length > 0 && (
          <>
            <div className="pt-4 pb-2">
              <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Administration
              </h3>
            </div>
            {adminNavigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    item.current
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </>
        )}

        {/* Profile Navigation */}
        <div className="pt-4 pb-2">
          <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Account
          </h3>
        </div>
        {profileNavigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={closeMobileMenu}
              className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                item.current
                  ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Sign Out Button */}
      <div className="p-3 lg:p-4 border-t border-gray-200">
        <Button
          variant="outline"
          className="w-full justify-start"
          // onClick={() => 
          onClick={() => signOut({ callbackUrl: '/' })}
        >
          <LogOut className="w-4 h-4 mr-2 flex-shrink-0" />
          Sign Out
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsMobileMenuOpen(true)}
          className="bg-white shadow-md"
        >
          <Menu className="w-4 h-4" />
        </Button>
      </div>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={closeMobileMenu}
        />
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:flex-col z-50">
        <DesktopSidebarContent />
      </div>

      {/* Mobile sidebar */}
      <div
        className={`lg:hidden fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <MobileSidebarContent />
      </div>
    </>
  );
}