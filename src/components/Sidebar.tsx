
import React from "react";
import { cn } from "@/lib/utils";
import { categoryData, configData } from "@/data/documentData";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

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
  const navigate = useNavigate();
  const location = useLocation();

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    navigate('/');
  };

  const handleConfigClick = (configId: string) => {
    if (configId === "categories") {
      navigate('/category-management');
    } else if (configId === "departments") {
      navigate('/department-management');
    }
  };

  return (
    <>
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-sidebar transition-transform duration-300 ease-in-out shadow-lg lg:static",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex h-16 items-center border-b border-sidebar-border px-4">
          <Menu className="mr-2 h-6 w-6 lg:hidden text-white" onClick={() => setIsOpen(false)} />
          <h1 className="text-lg font-bold text-white">QUẢN LÝ VĂN BẢN</h1>
        </div>
        <div className="flex flex-1 flex-col overflow-y-auto p-4">
          <div className="mb-6">
            <h2 className="mb-3 text-sm font-medium text-gray-200 uppercase tracking-wider">Danh mục</h2>
            <nav className="space-y-1.5">
              {categoryData.map((category) => (
                <button
                  key={category.id}
                  className={cn(
                    "flex w-full items-center rounded-md px-3 py-2.5 text-left text-sm transition-colors",
                    activeCategory === category.id && location.pathname === "/"
                      ? "bg-white bg-opacity-20 text-white font-medium"
                      : "text-gray-200 hover:bg-white hover:bg-opacity-10 hover:text-white"
                  )}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <category.icon className="mr-3 h-5 w-5" />
                  <span className="flex-1">{category.label}</span>
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white bg-opacity-20 text-xs">
                    {category.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>
          <div>
            <h2 className="mb-3 text-sm font-medium text-gray-200 uppercase tracking-wider">Cấu hình</h2>
            <nav className="space-y-1.5">
              {configData.map((item) => (
                <button
                  key={item.id}
                  className={cn(
                    "flex w-full items-center rounded-md px-3 py-2.5 text-left text-sm transition-colors",
                    (location.pathname === "/category-management" && item.id === "categories") ||
                    (location.pathname === "/department-management" && item.id === "departments")
                      ? "bg-white bg-opacity-20 text-white font-medium"
                      : "text-gray-200 hover:bg-white hover:bg-opacity-10 hover:text-white"
                  )}
                  onClick={() => handleConfigClick(item.id)}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center rounded-md bg-white bg-opacity-10 p-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sidebar">
              <span className="text-sm font-medium">AD</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">Admin</p>
              <p className="text-xs text-gray-300">admin@example.com</p>
            </div>
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
