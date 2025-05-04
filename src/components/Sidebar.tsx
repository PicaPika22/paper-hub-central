
import React from "react";
import { cn } from "@/lib/utils";
import { categoryData, configData } from "@/data/documentData";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const Sidebar = ({
  isOpen,
  setIsOpen,
  activeCategory,
  setActiveCategory,
}: SidebarProps) => {
  return (
    <>
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-sidebar text-white transition-transform duration-300 ease-in-out lg:static",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex h-16 items-center border-b border-sidebar-border px-4">
          <Menu className="mr-2 h-6 w-6 lg:hidden" onClick={() => setIsOpen(false)} />
          <h1 className="text-lg font-bold">QUẢN LÝ TÀI LIỆU, VĂN BẢN</h1>
        </div>
        <div className="flex flex-1 flex-col overflow-y-auto p-4">
          <div className="mb-6">
            <h2 className="mb-2 text-sm font-medium text-gray-200">Danh mục</h2>
            <nav className="space-y-1">
              {categoryData.map((category) => (
                <button
                  key={category.id}
                  className={cn(
                    "flex w-full items-center rounded-md px-3 py-2 text-left text-sm transition-colors",
                    activeCategory === category.id
                      ? "bg-white bg-opacity-20 text-white"
                      : "text-gray-200 hover:bg-white hover:bg-opacity-10 hover:text-white"
                  )}
                  onClick={() => setActiveCategory(category.id)}
                >
                  <category.icon className="mr-2 h-4 w-4" />
                  <span className="flex-1">{category.label}</span>
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white bg-opacity-20 text-xs">
                    {category.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>
          <div>
            <h2 className="mb-2 text-sm font-medium text-gray-200">Cấu hình</h2>
            <nav className="space-y-1">
              {configData.map((item) => (
                <button
                  key={item.id}
                  className="flex w-full items-center rounded-md px-3 py-2 text-left text-sm text-gray-200 transition-colors hover:bg-white hover:bg-opacity-10 hover:text-white"
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
