import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

// Fetch employees list
export const useEmployees = (cafeId = '') => {
  return useQuery(['employees', cafeId], async () => {
    const response = await axios.get(`/employees?cafe=${cafeId}`);
    return response.data;
  });
};

// Add a new employee
export const useAddEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation(employee => axios.post('/employee', employee), {
    onSuccess: () => {
      queryClient.invalidateQueries(['employees']);
    },
  });
};

// Update an employee
export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation(employee => axios.put('/employee', employee), {
    onSuccess: () => {
      queryClient.invalidateQueries(['employees']);
    },
  });
};

// Delete an employee
export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation(id => axios.delete(`/employee/${id}`), {
    onSuccess: () => {
      queryClient.invalidateQueries(['employees']);
    },
  });
};
