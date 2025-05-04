
import { 
  FileText, 
  File, 
  ImageIcon, 
  FileArchive, 
  FileType, 
  FileSpreadsheet 
} from "lucide-react";

export type DocumentCategory = 
  | "all" 
  | "internal" 
  | "contract" 
  | "meeting" 
  | "policy" 
  | "financial" 
  | "marketing";

export type DocumentFileType = 
  | "pdf" 
  | "doc" 
  | "image" 
  | "archive" 
  | "spreadsheet" 
  | "text";

export type Document = {
  id: string;
  title: string;
  category: DocumentCategory;
  department: string;
  date: string;
  fileType: DocumentFileType;
  description?: string;
};

export interface Category {
  id: DocumentCategory;
  label: string;
  count: number;
  icon: any;
  description?: string;
}

export const categoryData: Category[] = [
  { id: "all", label: "Tất cả văn bản", count: 8, icon: FileText },
  { id: "internal", label: "Văn bản nội bộ", count: 3, icon: FileText, description: "Văn bản nội bộ trong công ty" },
  { id: "contract", label: "Hợp đồng", count: 2, icon: File, description: "Các hợp đồng với đối tác, khách hàng" },
  { id: "meeting", label: "Biên bản họp", count: 1, icon: FileText, description: "Biên bản cuộc họp nội bộ" },
  { id: "policy", label: "Quy định & Chính sách", count: 1, icon: FileText, description: "Các quy định và chính sách của công ty" },
  { id: "financial", label: "Báo cáo tài chính", count: 1, icon: FileSpreadsheet, description: "Báo cáo tài chính định kỳ" },
  { id: "marketing", label: "Tài liệu Marketing", count: 0, icon: ImageIcon, description: "Tài liệu marketing và truyền thông" },
];

export const configData = [
  { id: "categories", label: "Quản lý danh mục", icon: FileText },
  { id: "departments", label: "Quản lý phòng ban", icon: FileText },
];

export const fileTypeIcons = {
  pdf: FileType,
  doc: FileText,
  image: ImageIcon,
  archive: FileArchive,
  spreadsheet: FileSpreadsheet,
  text: FileText,
};

export let documents: Document[] = [
  {
    id: "1",
    title: "Tài liệu 01",
    category: "internal",
    department: "Phòng nhân sự",
    date: "19/04/2023",
    fileType: "text",
  },
  {
    id: "2",
    title: "Tài liệu 02",
    category: "contract",
    department: "Phòng IT",
    date: "20/04/2023",
    fileType: "doc",
  },
  {
    id: "3",
    title: "Tài liệu 03",
    category: "internal",
    department: "Phòng nhân sự",
    date: "20/04/2023",
    fileType: "image",
  },
  {
    id: "4",
    title: "Tài liệu 04",
    category: "policy",
    department: "Ban giám đốc",
    date: "19/04/2023",
    fileType: "text",
  },
  {
    id: "5",
    title: "Tài liệu 05",
    category: "meeting",
    department: "Phòng Marketing",
    date: "18/04/2023",
    fileType: "image",
  },
  {
    id: "6",
    title: "Tài liệu 06",
    category: "financial",
    department: "Phòng tài chính",
    date: "19/04/2023",
    fileType: "image",
  },
  {
    id: "7",
    title: "Tài liệu 07",
    category: "contract",
    department: "Phòng nhân sự",
    date: "19/04/2023",
    fileType: "pdf",
  },
  {
    id: "8",
    title: "Tài liệu 08",
    category: "internal",
    department: "Phòng IT",
    date: "19/04/2023",
    fileType: "text",
  },
];

// CRUD operations
export const addDocument = (document: Document) => {
  documents = [...documents, document];
  updateCategoryCounts();
  return documents;
};

export const updateDocument = (document: Document) => {
  documents = documents.map((doc) => 
    doc.id === document.id ? document : doc
  );
  updateCategoryCounts();
  return documents;
};

export const deleteDocument = (id: string) => {
  documents = documents.filter((doc) => doc.id !== id);
  updateCategoryCounts();
  return documents;
};

// Update category counts based on documents array
export const updateCategoryCounts = () => {
  // Update 'all' category count
  const allCategory = categoryData.find(cat => cat.id === "all");
  if (allCategory) {
    allCategory.count = documents.length;
  }
  
  // Update other category counts
  categoryData.forEach(category => {
    if (category.id !== "all") {
      category.count = documents.filter(doc => doc.category === category.id).length;
    }
  });
};

export const addCategory = (category: Omit<Category, 'count'>) => {
  const newCategory = { ...category, count: 0 };
  categoryData.push(newCategory as Category);
  return categoryData;
};

export const updateCategory = (category: Category) => {
  const index = categoryData.findIndex(cat => cat.id === category.id);
  if (index !== -1) {
    categoryData[index] = { ...category };
  }
  return categoryData;
};

export const deleteCategory = (id: DocumentCategory) => {
  // Cannot delete "all" category
  if (id === "all") return categoryData;
  
  const index = categoryData.findIndex(cat => cat.id === id);
  if (index !== -1) {
    categoryData.splice(index, 1);
  }
  return categoryData;
};

export const getCategoryLabel = (categoryId: DocumentCategory): string => {
  const category = categoryData.find(cat => cat.id === categoryId);
  return category ? category.label : "Unknown";
};

export const getCategoryCount = (categoryId: DocumentCategory): number => {
  if (categoryId === "all") {
    return documents.length;
  }
  return documents.filter(doc => doc.category === categoryId).length;
};

export const getDocumentsByCategory = (categoryId: DocumentCategory): Document[] => {
  if (categoryId === "all") {
    return documents;
  }
  return documents.filter(doc => doc.category === categoryId);
};
