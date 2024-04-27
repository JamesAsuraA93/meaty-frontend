import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  HomeIcon,
  BoxIcon,
  UsersIcon,
  FileTextIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SidebarAdmin() {
  const router = useRouter();

  const menuItems = [
    { name: 'Overview', icon: HomeIcon, path: '/admin' },
    { name: 'Products', icon: BoxIcon, path: '/admin/products' },
    { name: 'Users', icon: UsersIcon, path: '/admin/users' },
  ];

  return (
    <div className="h-full w-64 bg-[#F7F5F3] flex flex-col items-center py-5">
      <div className="flex flex-col items-center justify-center">
        {menuItems.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            className="w-full text-left px-5 py-2 gap-2 flex items-center hover:bg-gray-200"
            onClick={() => router.push(item.path)}
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
