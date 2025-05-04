
import React from "react";
import { Eye, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Document, fileTypeIcons, getCategoryLabel } from "@/data/documentData";

interface DocumentCardProps {
  document: Document;
  viewMode: "grid" | "list";
}

const DocumentCard = ({ document, viewMode }: DocumentCardProps) => {
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

  if (viewMode === "list") {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-4 mb-2 flex items-center">
        <div className={`${getFileColor(document.fileType)} p-3 rounded-lg mr-4`}>
          <FileIcon className="h-6 w-6" />
        </div>
        <div className="flex-1">
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
          <Button variant="ghost" size="icon">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden h-full flex flex-col">
      <div className={`${getFileColor(document.fileType)} h-24 flex items-center justify-center`}>
        <FileIcon className="h-12 w-12" />
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-medium mb-2">{document.title}</h3>
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
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DocumentCard;
