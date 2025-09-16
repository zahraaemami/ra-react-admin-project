import React from "react";
import { TextInput } from "react-admin";
import { CustomList } from "../components/CustomList";

export const CompanyList = () => {
  const filters = [
    <TextInput key="name" source="filter_name__icontains" label="نام شرکت" />,
    <TextInput key="hostname" source="filter_hostname__icontains" label="هاست" />,
    <TextInput
      key="admin_email"
      source="filter_admin_users__email__icontains"
      label="ایمیل ادمین"
    />,
  ];

  const columns = [
    { source: "id", label: "شناسه", type: "text" },
    { source: "name", label: "نام شرکت", type: "text" },
    { source: "hostname", label: "هاست", type: "text" },
    { source: "admin_hostname", label: "هاست ادمین", type: "text" },
    { source: "about", label: "درباره", type: "text" },
    { source: "created_at", label: "تاریخ ایجاد", type: "date" },
    { source: "updated_at", label: "آخرین بروزرسانی", type: "date" },
  ];

  return <CustomList filters={filters} columns={columns} />;
};
