import React from "react";
import{BooleanField, Datagrid, DeleteButton, EditButton, List,TextField,TextInput,Filter} from "react-admin"
import { UserRolesExpand } from "./UserRolesExpand";
const UserFilters = [
  <TextInput key="first_name" source="filter_first_name__icontains" label="نام" />,
  <TextInput key="last_name" source="filter_last_name__icontains" label="نام خانوادگی" />,
  <TextInput key="gender" source="filter_gender__icontains" label="جنسیت" />,
  <TextInput key="mobile" source="filter_mobile__icontains" label="موبایل" />,
  <TextInput key="email" source="filter_email__icontains"  label="ایمیل"/>
];


export function UserList(props:any){
    return(
        <List {...props} filters={UserFilters} perPage={25}>
            <Datagrid rowClick="edit" expand={UserRolesExpand}>
                <TextField source="id"/>
                <TextField source="first_name"/>
                <TextField source="last_name"/>
                <TextField source="email"/>
                <TextField source="mobile"/>
                <TextField source="gender"/>
                <BooleanField source="is_active"/>
                <BooleanField source="is_staff"/>
                <BooleanField source="is_superuser"/>
                <EditButton/>
                <DeleteButton/>

            </Datagrid>
        </List>
    )
}