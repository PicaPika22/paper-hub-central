
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Play, Download, Share2, Edit, Trash, X, FileText, Calendar, Building, Clock, Hash, HardDrive } from "lucide-react";
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
      <DialogContent className="max-w-2xl p-0 overflow-hidden rounded-xl">
        <DialogHeader className="px-6 pt-6 pb-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold text-gray-800">{document.title}</DialogTitle>
            <DialogClose className="h-8 w-8 rounded-full hover:bg-gray-100 flex items-center justify-center">
              <X className="h-4 w-4" />
            </DialogClose>
          </div>
        </DialogHeader>
        
        <div className="px-6 py-4">
          <div className="grid grid-cols-2 gap-4 text-sm mb-6">
            <div className="flex items-start">
              <FileText className="h-4 w-4 text-gray-500 mt-0.5 mr-2" />
              <div>
                <p className="text-gray-500 mb-0.5">Danh mục:</p>
                <p className="font-medium text-gray-800">{getCategoryLabel(document.category as any)}</p>
              </div>
            </div>
            <div className="flex items-start">
              <Building className="h-4 w-4 text-gray-500 mt-0.5 mr-2" />
              <div>
                <p className="text-gray-500 mb-0.5">Phòng ban:</p>
                <p className="font-medium text-gray-800">{document.department}</p>
              </div>
            </div>
            <div className="flex items-start">
              <Calendar className="h-4 w-4 text-gray-500 mt-0.5 mr-2" />
              <div>
                <p className="text-gray-500 mb-0.5">Ngày ban hành:</p>
                <p className="font-medium text-gray-800">{document.date}</p>
              </div>
            </div>
            <div className="flex items-start">
              <Clock className="h-4 w-4 text-gray-500 mt-0.5 mr-2" />
              <div>
                <p className="text-gray-500 mb-0.5">Ngày hiệu lực:</p>
                <p className="font-medium text-gray-800">{document.date}</p>
              </div>
            </div>
            <div className="flex items-start">
              <Hash className="h-4 w-4 text-gray-500 mt-0.5 mr-2" />
              <div>
                <p className="text-gray-500 mb-0.5">Mã tài liệu:</p>
                <p className="font-medium text-gray-800">TL{document.id}</p>
              </div>
            </div>
            <div className="flex items-start">
              <HardDrive className="h-4 w-4 text-gray-500 mt-0.5 mr-2" />
              <div>
                <p className="text-gray-500 mb-0.5">Kích thước:</p>
                <p className="font-medium text-gray-800">{(Math.random() * 10).toFixed(2)} MB</p>
              </div>
            </div>
          </div>

          <div className="relative rounded-xl overflow-hidden bg-gray-800 aspect-video flex items-center justify-center mb-6 group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary/40"></div>
            <div className="relative z-10 w-16 h-16 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300 cursor-pointer">
              <Play className="h-8 w-8 text-white fill-white" />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 border-t">
          <div className="flex items-center gap-2">
            <Button variant="destructive" size="sm" className="gap-1 rounded-md shadow-sm" onClick={() => onDelete(document)}>
              <Trash className="h-4 w-4" />
              <span>Xóa</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-1 rounded-md shadow-sm" onClick={() => onEdit(document)}>
              <Edit className="h-4 w-4" />
              <span>Chỉnh sửa</span>
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1 rounded-md shadow-sm" onClick={handleShare}>
              <Share2 className="h-4 w-4" />
              <span>Chia sẻ</span>
            </Button>
            <Button variant="default" size="sm" className="gap-1 rounded-md shadow-sm" onClick={handleDownload}>
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
