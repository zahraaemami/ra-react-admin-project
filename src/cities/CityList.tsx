// src/cities/CityList.jsx
import React from 'react';
import { List, Datagrid, TextField, EditButton, DeleteButton,TextInput,Filter } from 'react-admin';

const CityFilters =[
  <TextInput source='filter_name__icontains' label="عنوان" />
]


export function CityList(props:any) {
  return (
    <List {...props} filters={CityFilters} perPage={25}>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="name" />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
}
