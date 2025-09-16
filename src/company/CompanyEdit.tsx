// src/company/CompanyEdit.tsx
// import React, { FC } from "react";
// import {
//   Edit,
//   SimpleForm,
//   TextInput,
//   ArrayInput,
//   SimpleFormIterator,
//   EditProps,
// } from "react-admin";

// const CompanyEdit: FC<EditProps> = (props) => (
//   <Edit {...props}>
//     <SimpleForm>
//       <TextInput source="name" label="نام شرکت" />
//       <TextInput source="hostname" label="هاست" />
//       <TextInput source="admin_hostname" label="هاست ادمین" />
//       <TextInput source="logo" label="لوگو" />
//       <TextInput source="badge_icon" label="آیکون" />
//       <TextInput source="about" label="درباره" multiline />
//       <TextInput source="landing_footer_text" label="متن فوتر" multiline />

//       <ArrayInput source="admin_users" label="ادمین‌ها">
//         <SimpleFormIterator>
//           <TextInput source="username" label="نام کاربری" />
//           <TextInput source="first_name" label="نام" />
//           <TextInput source="last_name" label="نام خانوادگی" />
//           <TextInput source="mobile" label="شماره موبایل" />
//           <TextInput source="email" label="ایمیل" />
//           <TextInput source="national_id" label="کد ملی" />
//         </SimpleFormIterator>
//       </ArrayInput>
//     </SimpleForm>
//   </Edit>
// );

// export default CompanyEdit;



// import React, { FC } from "react";
// import {
// Edit,SimpleForm,TextInput,ArrayInput,SimpleFormIterator,  EditProps,
// TabbedForm,
// ReferenceManyField,
// DataTable,} from "react-admin";

// const CompanyEdit: FC<EditProps> = (props) => (
//     <Edit {...props}>
//         <TabbedForm>
//             <TabbedForm.Tab label="نام شرکت">

//             </TabbedForm.Tab>
//             <TabbedForm.Tab label="ادمین ها">

//             </TabbedForm.Tab>
//             <TabbedForm.Tab label= "درباره">
//                 <ReferenceManyField
//                 target="company_id"
//                 sort={{field:"data" , order:"DESC"}}
//                 >
//                     <DataTable>
//                         <DataTable.Col source="first_name" field={DateField}/>
//                     </DataTable>
//                 </ReferenceManyField>

//             </TabbedForm.Tab>
//         </TabbedForm>

//     </Edit>


// );
//  export default CompanyEdit



// import React, { FC } from "react";
// import {
//   Edit,
//   TabbedForm,
//   FormTab,
//   TextInput,
//   ArrayInput,
//   SimpleFormIterator,
//   ReferenceManyField,
//   DataTable,
//   TextField,
//   DateField,
//   EmailField,
//   EditProps,
//   BulkDeleteButton,
// } from "react-admin";

// const CompanyEdit: FC<EditProps> = (props) => (
//   <Edit {...props}>
//     <TabbedForm>
//       {/* تب اطلاعات کلی شرکت */}
//       <FormTab label="نام شرکت">
//         <TextInput source="name" label="نام شرکت" />
//         <TextInput source="hostname" label="هاست" />
//         <TextInput source="admin_hostname" label="هاست ادمین" />
//         <TextInput source="logo" label="لوگو" />
//         <TextInput source="badge_icon" label="آیکون" />
//       </FormTab>

//       {/* تب ادمین ها */}
//       <FormTab label="ادمین‌ها">
//         <ArrayInput source="admin_users" label="ادمین‌ها">
//           <SimpleFormIterator>
//             <TextInput source="username" label="نام کاربری" />
//             <TextInput source="first_name" label="نام" />
//             <TextInput source="last_name" label="نام خانوادگی" />
//             <TextInput source="mobile" label="موبایل" />
//             <TextInput source="email" label="ایمیل" />
//           </SimpleFormIterator>
//         </ArrayInput>
//       </FormTab>

//       {/* تب درباره */}
//       <FormTab label="درباره">
//         <TextInput source="about" label="درباره" multiline />
//         <TextInput source="landing_footer_text" label="متن فوتر" multiline />

//         {/* DataTable برای نمایش داده‌های مرتبط */}
//         <ReferenceManyField
//           label="ادمین‌ها"
//           reference="users"
//           target="company_id"
//           sort={{ field: "first_name", order: "ASC" }}
//         >
//           <DataTable bulkActionButtons>
//             <TextField source="first_name" label="نام" />
//             <TextField source="last_name" label="نام خانوادگی" />
//             <EmailField source="email" label="ایمیل" />
//             <DateField source="created_at" label="تاریخ ایجاد" />
//             {/* حذف دسته جمعی */}
//             <BulkDeleteButton />
//           </DataTable>
//         </ReferenceManyField>
//       </FormTab>
//     </TabbedForm>
//   </Edit>
// );

// export default CompanyEdit;

import React, { FC, useState } from "react";
import {
  Edit,
  TabbedForm,
  FormTab,
  TextInput,
  ArrayInput,
  SimpleFormIterator,
  ReferenceManyField,
  DataTable,
  TextField,
  DateField,
  EmailField,
  EditProps,
  BulkDeleteButton,
  useRecordContext,
  BulkActionsProps,
} from "react-admin";
import { Button, Menu, MenuItem } from "@mui/material";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";

const CompanyEdit: FC<EditProps> = (props) => {
  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    "first_name",
    "last_name",
    "email",
    "created_at",
  ]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const toggleColumn = (column: string) => {
    setVisibleColumns((prev) =>
      prev.includes(column)
        ? prev.filter((c) => c !== column)
        : [...prev, column]
    );
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Edit {...props}>
      <TabbedForm>
        <FormTab label="نام شرکت">
          <TextInput source="name" label="نام شرکت" />
          <TextInput source="hostname" label="هاست" />
          <TextInput source="admin_hostname" label="هاست ادمین" />
        </FormTab>

        <FormTab label="ادمین‌ها">
          <ArrayInput source="admin_users" label="ادمین‌ها">
            <SimpleFormIterator>
              <TextInput source="username" label="نام کاربری" />
              <TextInput source="first_name" label="نام" />
              <TextInput source="last_name" label="نام خانوادگی" />
              <TextInput source="mobile" label="موبایل" />
              <TextInput source="email" label="ایمیل" />
            </SimpleFormIterator>
          </ArrayInput>
        </FormTab>

        <FormTab label="درباره">
          <TextInput source="about" label="درباره" multiline />
          <TextInput source="landing_footer_text" label="متن فوتر" multiline />

          {/* دکمه انتخاب ستون ها */}
          <Button
            startIcon={<ViewColumnIcon />}
            onClick={handleClick}
            variant="outlined"
            style={{ marginBottom: "8px" }}
          >
            نمایش ستون‌ها
          </Button>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            {["first_name", "last_name", "email", "created_at"].map((col) => (
              <MenuItem key={col} onClick={() => toggleColumn(col)}>
                <input type="checkbox" checked={visibleColumns.includes(col)} readOnly /> {col}
              </MenuItem>
            ))}
          </Menu>

          {/* DataTable با BulkDelete و ستون های قابل انتخاب */}
          <ReferenceManyField
            label="ادمین‌ها"
            reference="users"
            target="company_id"
            sort={{ field: "first_name", order: "ASC" }}
          >
            <DataTable bulkActionButtons>
              {visibleColumns.includes("first_name") && <TextField source="first_name" label="نام" />}
              {visibleColumns.includes("last_name") && <TextField source="last_name" label="نام خانوادگی" />}
              {visibleColumns.includes("email") && <EmailField source="email" label="ایمیل" />}
              {visibleColumns.includes("created_at") && <DateField source="created_at" label="تاریخ ایجاد" />}
              <BulkDeleteButton />
            </DataTable>
          </ReferenceManyField>
        </FormTab>
      </TabbedForm>
    </Edit>
  );
};

export default CompanyEdit;

