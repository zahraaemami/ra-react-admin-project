import React from 'react';
import { Admin, Resource,  ListGuesser } from 'react-admin';
import { CityList } from './cities/CityList';
import { CityCreate } from './cities/CityCreate';
import { CityEdit } from './cities/CityEdit';
import {UserList} from './users/UserList'
import dataProvider from './dataProvider';
import { authProvider } from './authProvider';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import farsiMessages from 'ra-language-farsi';
import { createTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { i18nProvider } from "./i18n";
import { UserEdit } from './users/UserEdit';
import { UserCreate } from './users/UserCreate';

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const theme = createTheme({
  direction: "rtl",
});





export default function App() {
  return (
    <CacheProvider value={cacheRtl}>
      <Admin
        i18nProvider={i18nProvider}
        dataProvider={dataProvider}
        authProvider={authProvider}
        theme={theme}
      >
        <Resource
          name="base/city"
          list={CityList}
          create={CityCreate}
          edit={CityEdit}
        />
        <Resource name="base/admin/user" 
        list={UserList}
        edit={UserEdit}
        create={UserCreate}
        />
      </Admin>
    </CacheProvider>
  );
}