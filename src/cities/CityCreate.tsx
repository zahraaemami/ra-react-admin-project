
import React from 'react';
import { Create, SimpleForm, TextInput, required } from 'react-admin';

export function CityCreate(props:any) {
  return (
    <Create title="Create City" {...props}>
      <SimpleForm>
        <TextInput source="name" validate={[required()]} />
      </SimpleForm>
    </Create>
  );
}
