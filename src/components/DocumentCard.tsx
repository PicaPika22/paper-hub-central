
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
    internal: "bg-blue-500 text-white",
    contract: "bg-amber-500 text-white",
    meeting: "bg-purple-500 text-white",
    policy: "bg-red-500 text-white",
    financial: "bg-green-500 text-white",
    marketing: "bg-pink-500 text-white",
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
          className={`${getFileColor(document.fileType)} p-3 rounded-lg mr-4`}
          onClick={() => onViewDetails(document)}
        >
          <FileIcon className="h-6 w-6" />
        </div>
        <div className="flex-1 cursor-pointer" onClick={() => onViewDetails(document)}>
          <h3 className="font-medium">{document.title}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
            <span className={`${categoryColor} text-xs px-2 py-0.5 rounded-full`}>
              {getCategoryLabel(document.category as any)}
            </span>
            <span>{document.department}</span>
            <span>{document.date}</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={() => onViewDetails(document)}>
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleDownload}>
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleShare}>
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div 
      className="bg-white rounded-lg shadow-sm border overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow"
    >
      <div 
        className={`${getFileColor(document.fileType)} h-24 flex items-center justify-center cursor-pointer`}
        onClick={() => onViewDetails(document)}
      >
        <FileIcon className="h-12 w-12" />
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 
          className="font-medium mb-2 cursor-pointer hover:text-blue-600 transition-colors"
          onClick={() => onViewDetails(document)}
        >
          {document.title}
        </h3>
        <div className="text-sm text-gray-500 space-y-1 mb-4 flex-1">
          <div>
            <span className={`${categoryColor} text-xs px-2 py-0.5 rounded-full`}>
              {getCategoryLabel(document.category as any)}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span>·</span>
            <span>{document.department}</span>
          </div>
          <div className="text-gray-400">{document.date}</div>
        </div>
        <div className="flex items-center justify-between border-t pt-3">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onViewDetails(document)}>
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleDownload}>
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleShare}>
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DocumentCard;
