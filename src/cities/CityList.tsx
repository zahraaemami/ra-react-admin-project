// // src/cities/CityList.jsx
// import React from 'react';
// import { List, Datagrid, TextField, EditButton, DeleteButton,TextInput,Filter } from 'react-admin';

// const CityFilters =[
//   <TextInput source='filter_name__icontains' label="عنوان" />
// ]


// export function CityList(props:any) {
//   return (
//     <List {...props} filters={CityFilters} perPage={25}  sort={{field:"id",order:"ASC"}} >
//       <Datagrid rowClick="edit">
//         <TextField source="id" />
//         <TextField source="name" />
//         <EditButton />
//         <DeleteButton />
//       </Datagrid>
//     </List>
//   );
// }


import React from "react";
import { TextField, TextInput, EditButton, DeleteButton, Filter, ListProps } from "react-admin";
import { CustomList } from "../components/CustomList";

const CityFilter = (props) => (
  <Filter {...props}>
    <TextInput source="filter_name__icontains" label="عنوان" alwaysOn />
  </Filter>
);

export const CityList: React.FC<ListProps> = (props) => {
  const columns = [
    { source: "id", label: "ID", element: <TextField source="id" /> },
    { source: "name", label: "نام شهر", element: <TextField source="name" /> },
    { source: "edit", label: "ویرایش", element: <EditButton /> },
    { source: "delete", label: "حذف", element: <DeleteButton /> },
  ];

  return <CustomList {...props} filters={<CityFilter />} columns={columns} />;
};

