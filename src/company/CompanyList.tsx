import React from "react";
import { TextField, TextInput, EditButton, DeleteButton, Filter, ListProps } from "react-admin";
import { CustomList } from "../components/CustomList";

const CompanyFilter = (props) => (
  <Filter {...props}>
    <TextInput source="filter_name__icontains" label="نام شرکت" alwaysOn />
    <TextInput source="filter_hostname__icontains" label="هاست" />
  </Filter>
);

export const CompanyList: React.FC<ListProps> = (props) => {
  const columns = [
    { source: "id", label: "شناسه", element: <TextField source="id" /> },
    { source: "name", label: "نام شرکت", element: <TextField source="name" /> },
    { source: "hostname", label: "هاست", element: <TextField source="hostname" /> },
    { source: "admin_hostname", label: "هاست ادمین", element: <TextField source="admin_hostname" /> },
    { source: "about", label: "درباره", element: <TextField source="about" /> },
    { source: "landing_footer_text", label: "متن فوتر", element: <TextField source="landing_footer_text" /> },
    { source: "created_at", label: "تاریخ ایجاد", element: <TextField source="created_at" /> },
    { source: "updated_at", label: "آخرین بروزرسانی", element: <TextField source="updated_at" /> },
    { source: "edit", label: "ویرایش", element: <EditButton /> },
    { source: "delete", label: "حذف", element: <DeleteButton /> },
  ];

  return <CustomList {...props} filters={<CompanyFilter />} columns={columns} />;
};
