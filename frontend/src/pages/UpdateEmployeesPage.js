// Page for updating the list of employees by adding or editing an employee
import React from 'react';
import { useNavigate, useParams } from '@tanstack/react-router';
import { useAddEmployee, useUpdateEmployee, useEmployees } from '../api/employees';
import { useCafes } from '../api/cafes';
import EmployeesForm from '../components/EmployeesForm';
import { Container } from '@mui/material';

const UpdateEmployeesPage = () => {
  const navigate = useNavigate();
  const { id = "" } = useParams({ strict: false });
  const { data: employees = [] } = useEmployees();
  const { data: cafes = [] } = useCafes();
  const addEmployee = useAddEmployee();
  const updateEmployee = useUpdateEmployee();

  const employeeToEdit = id ? employees.find(employee => employee.id === id) : {};

  const handleSubmit = (employeeData) => {
    if (id) {
      updateEmployee.mutate({ id: employeeToEdit.id, ...employeeData }, {
        onSuccess: () => navigate({to: '/employees'}),
      });
    } else {
      addEmployee.mutate(employeeData, {
        onSuccess: () => navigate({to: '/employees'}),
      });
    }
  };

  return (
    <Container>
      <EmployeesForm
        initialData={id ? employeeToEdit : {}} // Prefill if editing
        onSubmit={handleSubmit}
        onCancel={() => navigate({to: '/employees'})}
        cafesList={cafes}
      />
    </Container>
  );
};

export default UpdateEmployeesPage;
