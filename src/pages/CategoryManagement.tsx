
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Edit, FileText, Folder, Plus, Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Category, categoryData, addCategory, updateCategory, deleteCategory } from "@/data/documentData";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

const CategoryManagement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [categories, setCategories] = useState([...categoryData]);
  
  const form = useForm({
    defaultValues: {
      id: "",
      label: "",
      description: ""
    },
  });
  
  const onSubmit = (data: any) => {
    if (editingCategory) {
      // Update existing category
      const updatedCategories = updateCategory({
        ...editingCategory,
        label: data.label,
        description: data.description
      });
      setCategories([...updatedCategories]);
      toast.success("Cập nhật danh mục thành công!");
    } else {
      // Add new category
      const newCategory = {
        id: data.id as any,
        label: data.label,
        icon: FileText,
        description: data.description
      };
      const updatedCategories = addCategory(newCategory);
      setCategories([...updatedCategories]);
      toast.success("Thêm danh mục mới thành công!");
    }
    setIsOpen(false);
    setEditingCategory(null);
    form.reset();
  };

  const handleEdit = (category: Category) => {
    // Can't edit "all" category
    if (category.id === "all") {
      toast.error("Không thể chỉnh sửa danh mục mặc định!");
      return;
    }
    
    setEditingCategory(category);
    form.setValue("id", category.id);
    form.setValue("label", category.label);
    form.setValue("description", category.description || "");
    setIsOpen(true);
  };

  const handleDelete = (category: Category) => {
    // Can't delete "all" category
    if (category.id === "all") {
      toast.error("Không thể xóa danh mục mặc định!");
      return;
    }
    
    const updatedCategories = deleteCategory(category.id);
    setCategories([...updatedCategories]);
    toast.success("Xóa danh mục thành công!");
  };

  const handleAddNew = () => {
    setEditingCategory(null);
    form.reset({
      id: "",
      label: "",
      description: ""
    });
    setIsOpen(true);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        activeCategory="all"
        setActiveCategory={() => {}}
      />
      
      <div className="flex-1 flex flex-col lg:ml-64">
        <Header
          activeCategory="categories"
          viewMode="grid"
          setViewMode={() => {}}
          setIsOpen={setSidebarOpen}
        />
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold">Quản lý danh mục</h1>
            <Button onClick={handleAddNew}>
              <Plus className="mr-2 h-4 w-4" />
              Thêm danh mục mới
            </Button>
          </div>
          
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">ID</TableHead>
                  <TableHead>Tên danh mục</TableHead>
                  <TableHead>Mô tả</TableHead>
                  <TableHead className="text-center">Số lượng tài liệu</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">{category.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Folder className="mr-2 h-4 w-4 text-blue-500" />
                        {category.label}
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-500">
                      {category.description || "Không có mô tả"}
                    </TableCell>
                    <TableCell className="text-center">{category.count}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(category)}
                          disabled={category.id === "all"}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(category)}
                          disabled={category.id === "all"}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editingCategory ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="id"
                rules={{ 
                  required: "ID không được để trống",
                  validate: {
                    notExist: (value) => {
                      if (editingCategory) return true;
                      return !categories.some(cat => cat.id === value) || "ID đã tồn tại";
                    }
                  }
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID danh mục</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Nhập ID danh mục (ví dụ: report)" 
                        {...field} 
                        disabled={editingCategory !== null}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="label"
                rules={{ required: "Tên danh mục không được để trống" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên danh mục</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập tên danh mục" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mô tả</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Nhập mô tả cho danh mục (không bắt buộc)" 
                        className="resize-none" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsOpen(false);
                    setEditingCategory(null);
                  }}
                >
                  Hủy
                </Button>
                <Button type="submit">
                  {editingCategory ? "Cập nhật" : "Thêm mới"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CategoryManagement;
