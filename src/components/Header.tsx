
import React from "react";
import { Button } from "@/components/ui/button";
import { Search, Filter, Grid, List, Menu, Plus, User, FileText, Building } from "lucide-react";
import { Input } from "@/components/ui/input";
import { getCategoryLabel } from "@/data/documentData";
import { useNavigate, useLocation } from "react-router-dom";

interface HeaderProps {
  activeCategory: string;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  setIsOpen: (open: boolean) => void;
  onAddDocument?: () => void;
}

const Header = ({
  activeCategory,
  viewMode,
  setViewMode,
  setIsOpen,
  onAddDocument,
}: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isManagementPage = location.pathname.includes('category') || location.pathname.includes('department');
  const isHomePage = location.pathname === '/';
  
  // Get the appropriate title based on the current page
  const getPageTitle = () => {
    if (location.pathname.includes('category')) return "Quản lý danh mục";
    if (location.pathname.includes('department')) return "Quản lý phòng ban";
    return getCategoryLabel(activeCategory as any);
  };

  // Get the appropriate icon based on the current page
  const getIcon = () => {
    if (location.pathname.includes('category')) return <FileText className="h-5 w-5 mr-2" />;
    if (location.pathname.includes('department')) return <Building className="h-5 w-5 mr-2" />;
    return null;
  };

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
          <span className="cursor-pointer hover:text-blue-600" onClick={() => navigate('/')}>Thư viện</span>
          <span className="mx-2">&gt;</span>
          <span>{getPageTitle()}</span>
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
        {isHomePage ? (
          <Button 
            variant="default" 
            size="sm" 
            className="bg-primary text-white hover:bg-primary/90"
            onClick={onAddDocument}
          >
            <Plus className="h-4 w-4 mr-2" />
            Thêm văn bản mới
          </Button>
        ) : (
          <div className="flex items-center">
            {getIcon()}
            <h2 className="font-medium">{getPageTitle()}</h2>
          </div>
        )}
        
        {isHomePage ? (
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
        ) : (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/')}
          >
            Quay lại
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;
