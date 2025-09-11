import {FC} from "react"
import {useRecordContext} from 'react-admin';

export const UserRolesExpand: React.FC = () => {
 const record = useRecordContext();
  console.log(record)
  if (!record || !record.user_roles) return <div>نقشی وجود ندارد</div>;

  return (
    <ul>
      {record.user_roles.map((role: any) => (
        <li key={role.id}>
          {role.role.name} (ID: {role.id})
        </li>
      ))}
    </ul>
  );
};