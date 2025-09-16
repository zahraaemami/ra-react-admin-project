import { Stack } from "@mui/material";
import React from "react";
import { Edit, SimpleForm, TextInput, BooleanInput, DateInput, useRecordContext, TabbedForm, TabbedFormTabs } from "react-admin";

// const PageTitle =()=>{
//   const record = useRecordContext();
//   return<>Edit "{record?.first_name}"</>
// }

export function UserEdit(props: any) {
  return (
    <Edit title= "ویرایش کاربر"{...props}>
      <TabbedForm>
        <TabbedForm.Tab label="شاخه اصلی">
          <TextInput source="first_name" label="نام" />
          <TextInput source="last_name" label="نام خانوادگی" />

        </TabbedForm.Tab>
        <TabbedForm.Tab label="ادرس">
           <Stack direction="row" spacing={2}>
              <TextInput source="mobile" label="موبایل" />
              <TextInput source="email" label="ایمیل" />
              <BooleanInput source="is_active" label="فعال" />
        </Stack>
        </TabbedForm.Tab>
      </TabbedForm>
     
    </Edit>
  );
}
