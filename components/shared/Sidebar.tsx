"use client";

import React, { useState } from 'react';
import { 
  Home, 
  Settings, 
  Users, 
  Car, 
  Package, 
  Palette, 
  Star, 
  LogOut, 
  Menu, 
  X, 
  CarFront,
  Building2,
  FileText,
  Image,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { useAuthSession } from '@/lib/hooks/useAuth';

const Sidebar = () => {
  const { status, logout } = useAuthSession();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  if (pathname === "/login") {
    return null;
  }

  const navItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: CarFront, label: 'Rent Cars', href: '/rent-cars' },
    { icon: Users, label: 'Clients', href: '/clients' },
    { icon: Star, label: 'Reviews', href: '/reviews' },
    { icon: Building2, label: 'Brands', href: '/brands' },
    { icon: Car, label: 'Model', href: '/model' },
    { icon: Palette, label: 'Colors', href: '/colors' },
    { icon: Package, label: 'Features', href: '/features' },
    { icon: Image, label: 'Bannerlar', href: '/banners' },
    { icon: FileText, label: 'Shablonlar', href: '/templates' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 rounded-md shadow-md"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X size={24} className="text-white" /> : <Menu size={24} className="text-white" />}
      </button>

      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-blue-700 shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full py-6">
          <nav className="flex-1 overflow-y-auto px-3">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <span className={`flex items-center px-4 py-3 mb-2 rounded-lg transition-colors duration-150 ease-in-out
                  ${pathname === item.href
                    ? 'bg-blue-800 text-white'
                    : 'text-blue-100 hover:bg-blue-600'
                  }`}>
                  <item.icon className="w-5 h-5 mr-3" />
                  <span className="text-sm font-medium">{item.label}</span>
                </span>
              </Link>
            ))}
          </nav>

          <div className="px-3 mt-auto">
            {status === 'authenticated' && (
              <Button
                onClick={logout}
                variant="destructive"
                className="w-full justify-start bg-red-500 hover:bg-red-600 text-white"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;