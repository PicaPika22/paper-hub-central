
import React from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Calendar, FileUp, X } from "lucide-react";
import { DocumentCategory, DocumentFileType, categoryData } from "@/data/documentData";
import { departmentData } from "@/data/departmentData";

interface AddDocumentDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAddDocument: (document: any) => void;
}

const AddDocumentDialog = ({
  isOpen,
  onOpenChange,
  onAddDocument,
}: AddDocumentDialogProps) => {
  const form = useForm({
    defaultValues: {
      title: "",
      category: "",
      department: "",
      date: new Date().toISOString().split("T")[0],
      expiryDate: "",
      fileType: "pdf" as DocumentFileType,
      description: "",
    },
  });

  const onSubmit = (data: any) => {
    const newDocument = {
      id: `${Math.floor(Math.random() * 1000)}`,
      ...data,
    };
    onAddDocument(newDocument);
    onOpenChange(false);
    toast.success("Thêm văn bản mới thành công!");
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="text-xl font-semibold">Thêm văn bản mới</DialogTitle>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-6 pb-6">
            <FormField
              control={form.control}
              name="title"
              rules={{ required: "Tên văn bản không được để trống" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">Tên văn bản <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập tên văn bản" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                rules={{ required: "Vui lòng chọn danh mục" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium">Danh mục <span className="text-red-500">*</span></FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Hợp đồng" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categoryData
                          .filter(cat => cat.id !== "all")
                          .map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.label}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="department"
                rules={{ required: "Vui lòng chọn phòng ban" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium">Phòng ban <span className="text-red-500">*</span></FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="— Chọn phòng ban —" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {departmentData.map((department) => (
                          <SelectItem key={department.id} value={department.name}>
                            {department.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="date"
                rules={{ required: "Vui lòng chọn ngày" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium">Ngày ban hành <span className="text-red-500">*</span></FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input 
                          type="date" 
                          {...field} 
                          className="pr-10" 
                          placeholder="dd/mm/yyyy"
                        />
                      </FormControl>
                      <Calendar className="absolute right-3 top-3 h-4 w-4 text-gray-500" />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="expiryDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium">Ngày hiệu lực <span className="text-red-500">*</span></FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input 
                          type="date" 
                          {...field} 
                          className="pr-10"
                          placeholder="dd/mm/yyyy"
                        />
                      </FormControl>
                      <Calendar className="absolute right-3 top-3 h-4 w-4 text-gray-500" />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="fileType"
              rules={{ required: "Vui lòng chọn tệp" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">Tệp tin <span className="text-red-500">*</span></FormLabel>
                  <div className="border border-gray-200 bg-gray-50 rounded-md p-3 flex items-center justify-center">
                    <div className="text-center">
                      <FileUp className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                      <span className="text-sm text-gray-500">Chọn tệp</span>
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">Mô tả</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Nhập mô tả" 
                      className="min-h-[80px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter className="flex gap-2 pt-2">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                >
                  Hủy
                </Button>
              </DialogClose>
              <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
                Lưu văn bản
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddDocumentDialog;
