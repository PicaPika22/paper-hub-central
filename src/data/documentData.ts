
import { 
  FileText, 
  File, 
  ImageIcon, 
  FileArchive, 
  FilePdf, 
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
};

export const categoryData = [
  { id: "all", label: "Tất cả văn bản", count: 8, icon: FileText },
  { id: "internal", label: "Văn bản nội bộ", count: 3, icon: FileText },
  { id: "contract", label: "Hợp đồng", count: 2, icon: File },
  { id: "meeting", label: "Biên bản họp", count: 1, icon: FileText },
  { id: "policy", label: "Quy định & Chính sách", count: 1, icon: FileText },
  { id: "financial", label: "Báo cáo tài chính", count: 1, icon: FileSpreadsheet },
  { id: "marketing", label: "Tài liệu Marketing", count: 0, icon: ImageIcon },
];

export const configData = [
  { id: "categories", label: "Quản lý danh mục", icon: FileText },
  { id: "departments", label: "Quản lý phòng ban", icon: FileText },
];

export const fileTypeIcons = {
  pdf: FilePdf,
  doc: FileText,
  image: ImageIcon,
  archive: FileArchive,
  spreadsheet: FileSpreadsheet,
  text: FileText,
};

export const documents: Document[] = [
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
