
import React from "react";
import { Eye, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Document, fileTypeIcons, getCategoryLabel } from "@/data/documentData";
import { toast } from "sonner";

interface DocumentCardProps {
  document: Document;
  viewMode: "grid" | "list";
  onViewDetails: (document: Document) => void;
}

const DocumentCard = ({ document, viewMode, onViewDetails }: DocumentCardProps) => {
  const FileIcon = fileTypeIcons[document.fileType];
  const categoryColors: Record<string, string> = {
    internal: "bg-category-internal text-white",
    contract: "bg-category-contract text-white",
    meeting: "bg-category-meeting text-white",
    policy: "bg-category-policy text-white",
    financial: "bg-category-financial text-white",
    marketing: "bg-category-marketing text-white",
  };
  
  const categoryColor = categoryColors[document.category] || "bg-gray-500 text-white";
  
  const getFileColor = (fileType: string): string => {
    switch (fileType) {
      case "pdf":
        return "bg-red-100 text-red-500";
      case "doc":
        return "bg-blue-100 text-blue-500";
      case "image":
        return "bg-purple-100 text-purple-500";
      case "archive":
        return "bg-amber-100 text-amber-500";
      case "spreadsheet":
        return "bg-green-100 text-green-500";
      default:
        return "bg-blue-100 text-blue-500";
    }
  };

  const handleDownload = () => {
    toast.success("Tài liệu đang được tải xuống");
  };

  const handleShare = () => {
    toast.success("Đã sao chép liên kết chia sẻ vào clipboard");
  };

  if (viewMode === "list") {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-4 mb-2 flex items-center hover:shadow-md transition-shadow">
        <div 
          className={`${getFileColor(document.fileType)} p-3 rounded-lg mr-4 flex items-center justify-center transition-transform hover:scale-105`}
          onClick={() => onViewDetails(document)}
        >
          <FileIcon className="h-6 w-6" />
        </div>
        <div className="flex-1 cursor-pointer" onClick={() => onViewDetails(document)}>
          <h3 className="font-medium text-gray-800 hover:text-primary transition-colors">{document.title}</h3>
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mt-1">
            <span className={`${categoryColor} text-xs px-2 py-0.5 rounded-full`}>
              {getCategoryLabel(document.category as any)}
            </span>
            <span className="flex items-center text-gray-500">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-1.5"></span>
              {document.department}
            </span>
            <span className="flex items-center text-gray-500">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-1.5"></span>
              {document.date}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={() => onViewDetails(document)} className="hover:bg-gray-100 rounded-full">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleDownload} className="hover:bg-gray-100 rounded-full">
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleShare} className="hover:bg-gray-100 rounded-full">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div 
      className="bg-white rounded-lg shadow-sm border overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow group"
    >
      <div 
        className={`${getFileColor(document.fileType)} h-32 flex items-center justify-center cursor-pointer group-hover:scale-105 transition-transform duration-300`}
        onClick={() => onViewDetails(document)}
      >
        <FileIcon className="h-16 w-16 transform transition-transform group-hover:scale-110 duration-300" />
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 
          className="font-medium mb-2 cursor-pointer hover:text-primary transition-colors line-clamp-2"
          onClick={() => onViewDetails(document)}
        >
          {document.title}
        </h3>
        <div className="text-sm text-gray-500 space-y-1.5 mb-4 flex-1">
          <div>
            <span className={`${categoryColor} text-xs px-2 py-0.5 rounded-full`}>
              {getCategoryLabel(document.category as any)}
            </span>
          </div>
          <div className="flex items-center gap-1 text-gray-500">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
            <span>{document.department}</span>
          </div>
          <div className="text-gray-400">{document.date}</div>
        </div>
        <div className="flex items-center justify-between border-t pt-3">
          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-100 rounded-full" onClick={() => onViewDetails(document)}>
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-100 rounded-full" onClick={handleDownload}>
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-100 rounded-full" onClick={handleShare}>
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DocumentCard;
