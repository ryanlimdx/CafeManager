import React from 'react';
import { useNavigate, useParams } from '@tanstack/react-router';
import { useAddCafe, useUpdateCafe, useCafes } from '../api/cafes';
import CafesForm from '../components/CafesForm';
import { Container } from '@mui/material';

const UpdateCafesPage = () => {
  const navigate = useNavigate();
  const { id = "" } = useParams({ strict: false });
  const { data: cafes = [] } = useCafes();
  const addCafe = useAddCafe();
  const updateCafe = useUpdateCafe();

  const cafeToEdit = id ? cafes.find(cafe => cafe.id === id) : {};

  const handleSubmit = (cafeData) => {
    if (id) {
      updateCafe.mutate({ id: cafeToEdit.id, ...cafeData }, {
        onSuccess: () => navigate({to: '/'}),
      });
    } else {
      addCafe.mutate(cafeData, {
        onSuccess: () => navigate({to: '/'}),
      });
    }
  };

  return (
    <Container>
      <CafesForm
        initialData={id ? cafeToEdit : {}} // Prefill if editing
        onSubmit={handleSubmit}
        onCancel={() => navigate({to: '/'})}
      />
    </Container>
  );
};

export default UpdateCafesPage;
