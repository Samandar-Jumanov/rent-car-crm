"use client";

import React, { useState, useEffect } from 'react';
import { Home, Settings, Users, Car, Package, Palette, Star, HelpCircle, Sun, Moon, LogOut, Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/lib/hooks/useSidebar";
import { useAuthSession } from '@/lib/hooks/useAuth';

const Sidebar = () => {
  const { theme, toggleTheme } = useSidebar();
  const { status, logout } = useAuthSession();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.classList.toggle('dark', theme === 'dark');
    }
  }, [theme, mounted]);

  const navItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Car, label: 'Rent Cars', href: '/rent-cars' },
    { icon: Users, label: 'Clients', href: '/clients' },
    { icon: Star, label: 'Reviews', href: '/reviews' },
    { icon: Package, label: 'Brands', href: '/brands' },
    { icon: Palette, label: 'Colors', href: '/colors' },
    { icon: HelpCircle, label: 'Features', href: '/features' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ];

  if (!mounted) return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-blue-800 dark:bg-blue-900 rounded-md shadow-md"
      >
        {isOpen ? <X size={24} className="text-white" /> : <Menu size={24} className="text-white" />}
      </button>

      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-blue-800 dark:bg-blue-900 shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full py-6">
          <nav className="flex-1 overflow-y-auto px-3">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <span className={`flex items-center px-4 py-3 mb-2 rounded-lg transition-colors duration-150 ease-in-out
                  ${pathname === item.href 
                    ? 'bg-blue-600 text-white dark:bg-blue-700' 
                    : 'text-blue-100 hover:bg-blue-700 dark:hover:bg-blue-800'
                  }`}>
                  <item.icon className="w-5 h-5 mr-3" />
                  <span className="text-sm font-medium">{item.label}</span>
                </span>
              </Link>
            ))}
          </nav>

          <div className="px-3 mt-auto">
            <Button 
              onClick={toggleTheme} 
              variant="outline" 
              className="w-full mb-2 justify-start bg-blue-700 hover:bg-blue-600 border-blue-600 text-blue-100"
            >
              {theme === 'dark' ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </Button>
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
      </div>
    </>
  );
};

export default Sidebar;