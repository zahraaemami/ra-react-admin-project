// src/cities/CityList.jsx
import React from 'react';
import { List, Datagrid, TextField, EditButton, DeleteButton } from 'react-admin';

export function CityList(props:any) {
  return (
    <List {...props} perPage={25}>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="name" />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
}
