// src/company/CompanyCreate.tsx
import React, { FC } from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  ArrayInput,
  SimpleFormIterator,
  CreateProps,
} from "react-admin";

const CompanyCreate: FC<CreateProps> = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" label="نام شرکت" />
      <TextInput source="hostname" label="هاست" />
      <TextInput source="admin_hostname" label="هاست ادمین" />
      <TextInput source="logo" label="لوگو" />
      <TextInput source="badge_icon" label="آیکون" />
      <TextInput source="about" label="درباره" multiline />
      <TextInput source="landing_footer_text" label="متن فوتر" multiline />

      {/* اگر خواستی admin_users هم وارد بشه */}
      <ArrayInput source="admin_users" label="ادمین‌ها">
        <SimpleFormIterator>
          <TextInput source="username" label="نام کاربری" />
          <TextInput source="first_name" label="نام" />
          <TextInput source="last_name" label="نام خانوادگی" />
          <TextInput source="mobile" label="شماره موبایل" />
          <TextInput source="email" label="ایمیل" />
          <TextInput source="national_id" label="کد ملی" />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Create>
);

export default CompanyCreate;
