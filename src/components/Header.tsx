
import React from "react";
import { Button } from "@/components/ui/button";
import { Search, Filter, Grid, List, Menu, Plus, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { getCategoryLabel } from "@/data/documentData";

interface HeaderProps {
  activeCategory: string;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  setIsOpen: (open: boolean) => void;
}

const Header = ({
  activeCategory,
  viewMode,
  setViewMode,
  setIsOpen,
}: HeaderProps) => {
  return (
    <div className="sticky top-0 z-30 bg-white border-b">
      <div className="flex h-16 items-center px-4 gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setIsOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="hidden md:flex items-center text-sm text-gray-500">
          <span>Thư viện</span>
          <span className="mx-2">&gt;</span>
          <span>{getCategoryLabel(activeCategory as any)}</span>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <div className="relative hidden md:flex items-center">
            <Search className="absolute left-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Tìm kiếm văn bản..."
              className="pl-10 w-64 bg-gray-50"
            />
          </div>
          
          <Button variant="outline" size="sm">
            <User className="h-4 w-4 mr-2" />
            admin
          </Button>
        </div>
      </div>
      
      <div className="flex items-center justify-between border-t px-4 py-2">
        <Button variant="default" size="sm" className="bg-primary text-white hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Thêm văn bản mới
        </Button>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Bộ lọc
          </Button>
          
          <div className="flex border rounded overflow-hidden">
            <Button
              variant="ghost"
              size="sm"
              className={`px-2.5 rounded-none ${viewMode === 'grid' ? 'bg-gray-100' : ''}`}
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`px-2.5 rounded-none ${viewMode === 'list' ? 'bg-gray-100' : ''}`}
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
