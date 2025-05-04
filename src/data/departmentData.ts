
export interface Department {
  id: string;
  name: string;
  description?: string;
}

export const departmentData: Department[] = [
  {
    id: "1",
    name: "Phòng nhân sự",
    description: "Quản lý nhân sự và tuyển dụng",
  },
  {
    id: "2",
    name: "Phòng IT",
    description: "Quản lý hệ thống công nghệ thông tin",
  },
  {
    id: "3",
    name: "Phòng Marketing",
    description: "Quản lý hoạt động marketing và truyền thông",
  },
  {
    id: "4",
    name: "Phòng tài chính",
    description: "Quản lý tài chính và kế toán",
  },
  {
    id: "5",
    name: "Ban giám đốc",
    description: "Ban lãnh đạo công ty",
  },
];

export const addDepartment = (department: Department): Department[] => {
  const newDepartmentList = [...departmentData, department];
  return newDepartmentList;
};

export const updateDepartment = (department: Department): Department[] => {
  const updatedList = departmentData.map((item) =>
    item.id === department.id ? { ...department } : item
  );
  return updatedList;
};

export const deleteDepartment = (id: string): Department[] => {
  const filteredList = departmentData.filter((item) => item.id !== id);
  return filteredList;
};
