import React, { useState } from "react";
import {
  List,
  Datagrid,
  BulkDeleteButton,
  TopToolbar,
  CreateButton,
  ExportButton,
  ListProps,
} from "react-admin";
import { Button, Menu, MenuItem, Checkbox, ListItemIcon, ListItemText } from "@mui/material";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";

interface CustomListProps extends ListProps {
  columns: { source: string; label: string; element: React.ReactNode }[];
}

export const CustomList: React.FC<CustomListProps> = ({ columns, ...props }) => {
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>(
    columns.reduce((acc, col) => ({ ...acc, [col.source]: true }), {})
  );

  const toggleColumn = (column: string) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  const ListActions = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
      <TopToolbar>
        <CreateButton />
        <ExportButton />
        <Button startIcon={<ViewColumnIcon />} onClick={handleClick} style={{ marginLeft: 8 }}>
          مدیریت ستون‌ها
        </Button>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
          {columns.map((col) => (
            <MenuItem key={col.source} onClick={() => toggleColumn(col.source)}>
              <ListItemIcon>
                <Checkbox edge="start" checked={visibleColumns[col.source]} />
              </ListItemIcon>
              <ListItemText>{col.label}</ListItemText>
            </MenuItem>
          ))}
        </Menu>
      </TopToolbar>
    );
  };

  return (
    <List {...props} actions={<ListActions />}>
      <Datagrid bulkActionButtons={<BulkDeleteButton />}>
        {columns.map((col) => (visibleColumns[col.source] ? col.element : null))}
      </Datagrid>
    </List>
  );
};
