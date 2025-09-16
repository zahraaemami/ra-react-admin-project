// // import React from "react";
// // import{BooleanField, Datagrid, DeleteButton, EditButton, List,TextField,TextInput,Filter} from "react-admin"
// // import { UserRolesExpand } from "./UserRolesExpand";
// // import { UserEdit } from "./UserEdit";
// // const UserFilters = [
// //   <TextInput key="first_name" source="filter_first_name__icontains" label="نام" />,
// //   <TextInput key="last_name" source="filter_last_name__icontains" label="نام خانوادگی" />,
// //   <TextInput key="gender" source="filter_gender__icontains" label="جنسیت" />,
// //   <TextInput key="mobile" source="filter_mobile__icontains" label="موبایل" />,
// //   <TextInput key="email" source="filter_email__icontains"  label="ایمیل"/>
// // ];


// // export function UserList(props:any){
// //     return(
// //         <List {...props} filters={UserFilters} perPage={25} edit={UserEdit}  sx={{ width: "100%", overflowX: "auto" }} >
        
// //             <Datagrid rowClick="edit" expand={UserRolesExpand} sx={{ minWidth: 1300 }} >
// //                 <TextField source="id"/>
// //                 <TextField source="first_name"/>
// //                 <TextField source="last_name"/>
// //                 <TextField source="email"/>
// //                 <TextField source="mobile"/>
// //                 <TextField source="gender"/>
// //                 <BooleanField source="is_active"/>
// //                 <BooleanField source="is_staff"/>
// //                 <BooleanField source="is_superuser"/>
// //                 <EditButton/>
// //                 <DeleteButton/>

// //             </Datagrid>
// //         </List>
// //     )
// // }

// import React from "react";
// import { BooleanField, Datagrid, DeleteButton, EditButton, List, TextField, TextInput } from "react-admin";
// import { UserRolesExpand } from "./UserRolesExpand";
// import { UserEdit } from "./UserEdit";

// const UserFilters = [
//   <TextInput key="first_name" source="filter_first_name__icontains" label="نام" />,
//   <TextInput key="last_name" source="filter_last_name__icontains" label="نام خانوادگی" />,
//   <TextInput key="gender" source="filter_gender__icontains" label="جنسیت" />,
//   <TextInput key="mobile" source="filter_mobile__icontains" label="موبایل" />,
//   <TextInput key="email" source="filter_email__icontains" label="ایمیل" />,
// ];

// export function UserList(props: any) {
//   return (
//     <List {...props} filters={UserFilters} perPage={25}   sx={{ width: "100%", overflowX: "auto" }} >
//       <Datagrid rowClick="edit" expand={UserRolesExpand} sx={{ minWidth: 1300 }} >
//         <TextField source="id" sx={{ width: 70 }} />
//         <TextField source="first_name" sx={{ width: 150 }} />
//         <TextField source="last_name" sx={{ width: 150 }} />
//         <TextField source="email" sx={{ width: 200 }} />
//         <TextField source="mobile" sx={{ width: 150 }} />
//         <TextField source="gender" sx={{ width: 100 }} />
//         <BooleanField source="is_active" sx={{ width: 100 }} />
//         <BooleanField source="is_staff" sx={{ width: 100 }} />
//         <BooleanField source="is_superuser" sx={{ width: 120 }} />
//         <EditButton sx={{ width: 80 }} />
//         <DeleteButton sx={{ width: 80 }} />
//       </Datagrid>
//     </List>
//   );
// }


import React from "react";
import { TextField, BooleanField, TextInput, EditButton, DeleteButton, Filter, ListProps } from "react-admin";
import { CustomList } from "../components/CustomList";

const UserFilter = (props) => (
  <Filter {...props}>
    <TextInput source="filter_first_name__icontains" label="نام"/>
    <TextInput source="filter_last_name__icontains" label="نام خانوادگی" />
    <TextInput source="filter_gender__icontains" label="جنسیت" />
    <TextInput source="filter_mobile__icontains" label="موبایل" />
    <TextInput source="filter_email__icontains" label="ایمیل" />
  </Filter>
);

export const UserList: React.FC<ListProps> = (props) => {
  const columns = [
    { source: "id", label: "ID", element: <TextField source="id" /> },
    { source: "first_name", label: "نام", element: <TextField source="first_name" /> },
    { source: "last_name", label: "نام خانوادگی", element: <TextField source="last_name" /> },
    { source: "email", label: "ایمیل", element: <TextField source="email" /> },
    { source: "mobile", label: "موبایل", element: <TextField source="mobile" /> },
    { source: "gender", label: "جنسیت", element: <TextField source="gender" /> },
    { source: "is_active", label: "فعال", element: <BooleanField source="is_active" /> },
    { source: "is_staff", label: "استاف", element: <BooleanField source="is_staff" /> },
    { source: "is_superuser", label: "سوپر یوزر", element: <BooleanField source="is_superuser" /> },
    { source: "edit", label: "ویرایش", element: <EditButton /> },
    { source: "delete", label: "حذف", element: <DeleteButton /> },
  ];

  return <CustomList {...props} filters={<UserFilter />} columns={columns} />;
};
