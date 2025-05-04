
import React from "react";
import { useForm } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
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
      fileType: "pdf" as DocumentFileType,
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
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Thêm văn bản mới</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              rules={{ required: "Tiêu đề không được để trống" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tiêu đề văn bản</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập tiêu đề văn bản" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="category"
              rules={{ required: "Vui lòng chọn danh mục" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Danh mục</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn danh mục văn bản" />
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
                  <FormLabel>Phòng ban</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn phòng ban" />
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
            
            <FormField
              control={form.control}
              name="date"
              rules={{ required: "Vui lòng chọn ngày" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ngày ban hành</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="fileType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loại tài liệu</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn loại tài liệu" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="doc">Word</SelectItem>
                      <SelectItem value="image">Hình ảnh</SelectItem>
                      <SelectItem value="spreadsheet">Excel</SelectItem>
                      <SelectItem value="text">Văn bản</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Hủy
              </Button>
              <Button type="submit">Thêm văn bản</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddDocumentDialog;
