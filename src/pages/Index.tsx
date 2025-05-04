
import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import DocumentCard from "@/components/DocumentCard";
import { getDocumentsByCategory } from "@/data/documentData";

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const documents = getDocumentsByCategory(activeCategory as any);

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
        />
        
        <main className="flex-1 p-4">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {documents.map((document) => (
                <DocumentCard
                  key={document.id}
                  document={document}
                  viewMode={viewMode}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {documents.map((document) => (
                <DocumentCard
                  key={document.id}
                  document={document}
                  viewMode={viewMode}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;
