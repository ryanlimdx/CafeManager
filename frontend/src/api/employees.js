import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from './axios';

// Fetch employees list
export const useEmployees = (cafe = '') => {
  return useQuery({
    queryKey: ['employees', cafe],
    queryFn: async () => {
      const url = cafe ? `/employees?cafe=${cafe}` : '/employees';
      const response = await axios.get(url);
      return response.data;
    },
  });
};

// Add a new employee
export const useAddEmployee = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (employee) => {
      return axios.post('/employees', employee);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
  });
};

// Update a employee
export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (employee) => {
      console.log('employee updating:', employee);
      return axios.put(`/employees/${employee.id}`, employee);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
  });
};

// Delete a employee
export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id) => {
      return axios.delete(`/employees/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
  });
};
