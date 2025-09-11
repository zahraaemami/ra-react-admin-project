
import React from 'react';
import { Edit, SimpleForm, TextInput, TextField } from 'react-admin';

export function CityEdit(props:any) {
  return (
    <Edit title="Edit City" {...props}>
      <SimpleForm>
        <TextField source="id" />
        <TextInput source="name" />
      </SimpleForm>
    </Edit>
  );
}
