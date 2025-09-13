import React from "react";
import { Create, SimpleForm, TextInput, BooleanInput, DateInput } from "react-admin";

export function UserCreate(props: any) {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput source="username" label="نام کاربری" required />
        <TextInput source="password" label="رمز عبور" type="password" required /> 
        <TextInput source="confirm_password" label="تکرار رمز عبور" type="password" required />
        <TextInput source="first_name" label="نام" required />
        <TextInput source="last_name" label="نام خانوادگی" required />
        {/* <DateInput source="birth_date" label="تاریخ تولد" required /> */}
        <TextInput source="mobile" label="موبایل" required />
        <TextInput source="email" label="ایمیل" type="email" required />
        <BooleanInput source="is_active" label="فعال" defaultValue={true} />
        {/* <TextInput source="national_id" label="کد ملی" required /> */}
      </SimpleForm>
    </Create>
  );
}
