
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
import { Building, Edit, Plus, Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Department, departmentData } from "@/data/departmentData";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

const DepartmentManagement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [departments, setDepartments] = useState<Department[]>([...departmentData]);
  
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
  });
  
  const onSubmit = (data: any) => {
    if (editingDepartment) {
      // Update existing department
      const updatedDepartment = {
        ...editingDepartment,
        name: data.name,
        description: data.description,
      };
      
      const updatedDepartments = departments.map((dept) =>
        dept.id === editingDepartment.id ? updatedDepartment : dept
      );
      
      setDepartments(updatedDepartments);
      toast.success("Cập nhật phòng ban thành công!");
    } else {
      // Add new department
      const newDepartment = {
        id: `${departments.length + 1}`,
        name: data.name,
        description: data.description,
      };
      
      setDepartments([...departments, newDepartment]);
      toast.success("Thêm phòng ban mới thành công!");
    }
    
    setIsOpen(false);
    setEditingDepartment(null);
    form.reset();
  };

  const handleEdit = (department: Department) => {
    setEditingDepartment(department);
    form.setValue("name", department.name);
    form.setValue("description", department.description || "");
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    setDepartments(departments.filter((dept) => dept.id !== id));
    toast.success("Xóa phòng ban thành công!");
  };

  const handleAddNew = () => {
    setEditingDepartment(null);
    form.reset({
      name: "",
      description: "",
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
          activeCategory="departments"
          viewMode="grid"
          setViewMode={() => {}}
          setIsOpen={setSidebarOpen}
        />
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold">Quản lý phòng ban</h1>
            <Button onClick={handleAddNew}>
              <Plus className="mr-2 h-4 w-4" />
              Thêm phòng ban mới
            </Button>
          </div>
          
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">ID</TableHead>
                  <TableHead>Tên phòng ban</TableHead>
                  <TableHead>Mô tả</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {departments.map((department) => (
                  <TableRow key={department.id}>
                    <TableCell className="font-medium">{department.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Building className="mr-2 h-4 w-4 text-blue-500" />
                        {department.name}
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-500">
                      {department.description || "Không có mô tả"}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(department)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(department.id)}
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
            <DialogTitle>
              {editingDepartment ? "Chỉnh sửa phòng ban" : "Thêm phòng ban mới"}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                rules={{ required: "Tên phòng ban không được để trống" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên phòng ban</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập tên phòng ban" {...field} />
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
                        placeholder="Nhập mô tả cho phòng ban (không bắt buộc)" 
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
                    setEditingDepartment(null);
                  }}
                >
                  Hủy
                </Button>
                <Button type="submit">
                  {editingDepartment ? "Cập nhật" : "Thêm mới"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DepartmentManagement;
