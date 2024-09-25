import React from "react";
import { useEmployees, useDeleteEmployee } from "../api/employees";
import { Box, Button, Container, Typography } from "@mui/material";
import EmployeeTable from "../components/EmployeesTable";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const EmployeesPage = () => {
  const { cafe: cafeId, cafeName } = useSearch({from: '/employees'});
  const { data: employees = [], isLoading } = useEmployees(cafeId);
  const deleteEmployee = useDeleteEmployee();
  const navigate = useNavigate();

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  // Handle delete confirmation
  const handleDeleteConfirm = (id) => {
    setEmployeeToDelete(id);
    setOpenConfirmDialog(true);
  };

  // Handle actual deletion
  const handleDelete = () => {
    deleteEmployee.mutate(employeeToDelete);
    setOpenConfirmDialog(false);
  };

  if (isLoading) return <Container><div>Loading...</div></Container>;

  return (
    <Container>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom="20px"
      >
        <Typography variant="h5">
        Employees {cafeId ? `@ Café ${cafeName}` : ''}
        </Typography>
        <Button
          color="primary"
          variant="contained"
          aria-label="add"
          onClick={() => {
            navigate({ to: "/add-employee" });
          }}
          style={{
            paddingLeft: '20px',
            paddingRight: '20px',
            textTransform: 'none' 
          }}
        >
          + New Employee
        </Button>
      </Box>

      <EmployeeTable
        employees={employees}
        onEdit={(employee) => navigate({ to: `/edit-employee/${employee.id}` })}
        onDelete={handleDeleteConfirm}
      />

      {/* Confirm Delete Dialog */}
      <Dialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this employee?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default EmployeesPage;
