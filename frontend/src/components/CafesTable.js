import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const CafeTable = ({ cafes, onEdit, onDelete }) => {
  const columnDefs = [
    { headerName: "Café", field: "name", sortable: true, filter: true },
    { headerName: "Description", field: "description", flex: 2 },
    { headerName: "Employees", field: "employees", sortable: true },
    { headerName: "Location", field: "location", sortable: true, filter: true },
    {
      headerName: "Actions",
      cellRenderer: (params) => (
        <div>
          <IconButton
            color="grey"
            onClick={() => onEdit(params.data)}
            style={{ marginRight: "10px" }}
          >
            <EditIcon />
          </IconButton>
          <IconButton color="grey" onClick={() => onDelete(params.data.id)}>
            <DeleteIcon />
          </IconButton>
        </div>
      ),
      headerClass: 'header-center',
      cellStyle: { textAlign: "center"},
      sortable: false,
    },
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
      <AgGridReact
        rowData={cafes}
        columnDefs={columnDefs}
        defaultColDef={{ flex: 1 }}
        pagination={true}
        paginationPageSize={20}
      />
    </div>
  );
};

export default CafeTable;
