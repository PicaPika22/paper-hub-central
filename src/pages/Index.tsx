
import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import DocumentCard from "@/components/DocumentCard";
import DocumentDetailsDialog from "@/components/DocumentDetailsDialog";
import AddDocumentDialog from "@/components/AddDocumentDialog";
import { Document, addDocument, deleteDocument, getDocumentsByCategory, updateDocument } from "@/data/documentData";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isAddDocumentOpen, setIsAddDocumentOpen] = useState(false);
  
  // Get documents based on active category
  const documents = getDocumentsByCategory(activeCategory as any);
  
  const handleViewDetails = (document: Document) => {
    setSelectedDocument(document);
    setIsDetailsOpen(true);
  };
  
  const handleAddDocument = () => {
    setIsAddDocumentOpen(true);
  };
  
  const handleSaveDocument = (document: Document) => {
    addDocument(document);
    toast.success("Thêm văn bản mới thành công!");
  };
  
  const handleEditDocument = (document: Document) => {
    // In a real app, this would open an edit form
    toast.info("Chức năng chỉnh sửa đang được phát triển");
    setIsDetailsOpen(false);
  };
  
  const handleDeleteDocument = (document: Document) => {
    deleteDocument(document.id);
    toast.success("Xóa văn bản thành công!");
    setIsDetailsOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      
      <div className="flex-1 flex flex-col lg:ml-64">
        <Header
          activeCategory={activeCategory}
          viewMode={viewMode}
          setViewMode={setViewMode}
          setIsOpen={setIsOpen}
          onAddDocument={handleAddDocument}
        />
        
        <main className="flex-1 p-4 md:p-6">
          {documents.length > 0 ? (
            viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {documents.map((document) => (
                  <DocumentCard
                    key={document.id}
                    document={document}
                    viewMode={viewMode}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {documents.map((document) => (
                  <DocumentCard
                    key={document.id}
                    document={document}
                    viewMode={viewMode}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            )
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500 bg-white p-8 rounded-xl shadow-sm border">
              <FileQuestion className="h-12 w-12 text-gray-400 mb-4" />
              <p className="mb-2 text-center">Không có tài liệu nào trong danh mục này</p>
              <Button
                variant="default"
                size="sm"
                className="mt-4 shadow-sm"
                onClick={handleAddDocument}
              >
                Thêm văn bản mới
              </Button>
            </div>
          )}
        </main>
      </div>
      
      <DocumentDetailsDialog
        document={selectedDocument}
        isOpen={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        onEdit={handleEditDocument}
        onDelete={handleDeleteDocument}
      />
      
      <AddDocumentDialog 
        isOpen={isAddDocumentOpen}
        onOpenChange={setIsAddDocumentOpen}
        onAddDocument={handleSaveDocument}
      />
    </div>
  );
};

export default Index;
