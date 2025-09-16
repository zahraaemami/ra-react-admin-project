
import React from 'react';
import { Stack } from "@mui/material";

import { Edit, SimpleForm, TextInput, TextField} from 'react-admin';

export function CityEdit(props:any) {
  return (
    <Edit title="ویرایش شهر" {...props}>
      <SimpleForm>
         <Stack direction="row" spacing={2}>
          <TextField source="id" />
          <TextInput source="name" />
         </Stack>
        
      </SimpleForm>
    </Edit>
  );
}
