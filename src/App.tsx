import { Admin, Resource } from "react-admin";
import dataProvider from "./dataProvider";
import { CityList } from './cities/CityList';
import { CityCreate } from './cities/CityCreate';
import { CityEdit } from './cities/CityEdit';
import { authProvider } from './authProvider';
const App = () => (
  <Admin dataProvider={dataProvider}  authProvider={authProvider}>
    <Resource
      name="base/city"
      list={CityList}
      edit={CityEdit}
      create={CityCreate}
    />
  </Admin>
);

export default App;
