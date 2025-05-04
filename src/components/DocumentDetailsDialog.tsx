
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Play, Download, Share2, Edit, Trash, X } from "lucide-react";
import { Document, getCategoryLabel } from "@/data/documentData";
import { toast } from "sonner";

interface DocumentDetailsDialogProps {
  document: Document | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (document: Document) => void;
  onDelete: (document: Document) => void;
}

const DocumentDetailsDialog = ({
  document,
  isOpen,
  onOpenChange,
  onEdit,
  onDelete,
}: DocumentDetailsDialogProps) => {
  if (!document) return null;

  const handleDownload = () => {
    toast.success("Tài liệu đang được tải xuống");
  };

  const handleShare = () => {
    toast.success("Đã sao chép liên kết chia sẻ vào clipboard");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-medium">{document.title}</DialogTitle>
            <DialogClose className="h-6 w-6 rounded-full hover:bg-gray-100">
              <X className="h-4 w-4" />
            </DialogClose>
          </div>
        </DialogHeader>
        
        <div className="px-6 py-4">
          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
            <div>
              <p className="text-gray-500">Danh mục:</p>
              <p className="font-medium">{getCategoryLabel(document.category as any)}</p>
            </div>
            <div>
              <p className="text-gray-500">Phòng ban:</p>
              <p className="font-medium">{document.department}</p>
            </div>
            <div>
              <p className="text-gray-500">Ngày ban hành:</p>
              <p className="font-medium">{document.date}</p>
            </div>
            <div>
              <p className="text-gray-500">Ngày hiệu lực:</p>
              <p className="font-medium">{document.date}</p>
            </div>
            <div>
              <p className="text-gray-500">Mã tài liệu:</p>
              <p className="font-medium">TL{document.id}</p>
            </div>
            <div>
              <p className="text-gray-500">Kích thước:</p>
              <p className="font-medium">{(Math.random() * 10).toFixed(2)} MB</p>
            </div>
          </div>

          <div className="relative rounded-md overflow-hidden bg-gray-800 aspect-video flex items-center justify-center mb-4">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-900 to-blue-900 opacity-80"></div>
            <div className="relative z-10 w-16 h-16 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
              <Play className="h-8 w-8 text-white fill-white" />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 border-t">
          <div className="flex items-center gap-2">
            <Button variant="destructive" size="sm" className="gap-1" onClick={() => onDelete(document)}>
              <Trash className="h-4 w-4" />
              <span>Xóa</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-1" onClick={() => onEdit(document)}>
              <Edit className="h-4 w-4" />
              <span>Chỉnh sửa</span>
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1" onClick={handleShare}>
              <Share2 className="h-4 w-4" />
              <span>Chia sẻ</span>
            </Button>
            <Button variant="default" size="sm" className="gap-1" onClick={handleDownload}>
              <Download className="h-4 w-4" />
              <span>Tải xuống</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentDetailsDialog;
