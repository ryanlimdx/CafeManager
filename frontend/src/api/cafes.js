import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from './axios';

// Fetch cafes list
export const useCafes = (location = '') => {
  return useQuery({
    queryKey: ['cafes', location],
    queryFn: async () => {
      const url = location ? `/cafes?location=${location}` : '/cafes';
      const response = await axios.get(url);
      return response.data;
    },
  });
};

// Add a new cafe
export const useAddCafe = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (cafe) => {
      return axios.post('/cafes', cafe);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cafes'] });
    },
  });
};

// Update a cafe
export const useUpdateCafe = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (cafe) => {
      return axios.put(`/cafes/${cafe.id}`, cafe);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cafes'] });
    },
  });
};

// Delete a cafe
export const useDeleteCafe = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id) => {
      return axios.delete(`/cafes/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cafes'] });
    },
  });
};
