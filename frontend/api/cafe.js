import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

// Fetch cafes list
export const useCafes = (location = '') => {
  return useQuery(['cafes', location], async () => {
    const response = await axios.get(`/cafes?location=${location}`);
    return response.data;
  });
};

// Add a new cafe
export const useAddCafe = () => {
  const queryClient = useQueryClient();
  return useMutation(cafe => axios.post('/cafe', cafe), {
    onSuccess: () => {
      queryClient.invalidateQueries(['cafes']);
    },
  });
};

// Update a cafe
export const useUpdateCafe = () => {
  const queryClient = useQueryClient();
  return useMutation(cafe => axios.put('/cafe', cafe), {
    onSuccess: () => {
      queryClient.invalidateQueries(['cafes']);
    },
  });
};

// Delete a cafe
export const useDeleteCafe = () => {
  const queryClient = useQueryClient();
  return useMutation(id => axios.delete(`/cafe/${id}`), {
    onSuccess: () => {
      queryClient.invalidateQueries(['cafes']);
    },
  });
};
