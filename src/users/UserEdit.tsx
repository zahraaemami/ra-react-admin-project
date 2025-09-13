import React from "react";
import { Edit, SimpleForm, TextInput, BooleanInput, DateInput, useRecordContext } from "react-admin";

// const PageTitle =()=>{
//   const record = useRecordContext();
//   return<>Edit "{record?.first_name}"</>
// }

export function UserEdit(props: any) {
  return (
    <Edit title= "ویرایش کاربر"{...props}>
      <SimpleForm>
        {/* <TextInput source="username" label="نام کاربری" /> */}
        {/* <TextInput source="password" label="رمز عبور" type="password" /> */}
        {/* <TextInput source="confirm_password" label="تکرار رمز عبور" type="password" /> */}
        <TextInput source="first_name" label="نام" />
        <TextInput source="last_name" label="نام خانوادگی" />
        {/* <DateInput source="birth_date" label="تاریخ تولد" /> */}
        <TextInput source="mobile" label="موبایل" />
        <TextInput source="email" label="ایمیل" />
        <BooleanInput source="is_active" label="فعال" />
        {/* <TextInput source="national_id" label="کد ملی" /> */}
      </SimpleForm>
    </Edit>
  );
}
