import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  Grid,
  Typography,
  TextField,
  Dialog,
  DialogActions,
  DialogTitle,
  Container,
} from "@mui/material";
import { useBeforeUnload } from "react-router-dom";
import { FormDirtyContext } from "../context/DirtyContext";

const CafesForm = ({ initialData = {}, onSubmit, onCancel }) => {
  const [name, setName] = useState(initialData.name || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [location, setLocation] = useState(initialData.location || "");
  const [openDialog, setOpenDialog] = useState(false);
  const { isFormDirty, setIsFormDirty } = React.useContext(FormDirtyContext);

  // Loads preset data if it comes in later
  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setDescription(initialData.description || "");
      setLocation(initialData.location || "");
    }
  }, [initialData]);

  // Prompt user before closing the tab with unsaved changes
  useBeforeUnload((e) => {
    if (isFormDirty) {
      e.preventDefault();
    }
  });
  const handleFormChange = () => setIsFormDirty(true);

  // Validation checks
  const [errors, setErrors] = useState({});
  const validate = () => {
    const newErrors = {};
    if (name.length < 6 || name.length > 10) {
      newErrors.name = "Name must be between 6 and 10 characters.";
    }
    if (description.length > 256) {
      newErrors.description = "Description cannot exceed 256 characters.";
    }
    if (!location) {
      newErrors.location = "Location is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = () => {
    if (validate()) {
      onSubmit({ name, description, location });
      setIsFormDirty(false);
    }
  };

  // Handle cancel with unsaved changes prompt
  const handleCancel = () => {
    if (isFormDirty) {
      setOpenDialog(true);
    } else {
      onCancel();
    }
  };

  const confirmLeave = () => {
    setOpenDialog(false);
    setIsFormDirty(false);
    onCancel();
  };

  return (
    <Container>
      <Box sx={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
        <Typography variant="h5" marginBottom="20px">
          {initialData.id ? "Edit Café" : "Add Café"}
        </Typography>
        
        <Grid container spacing={2}>
          {/* Name Field */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                handleFormChange();
              }}
              error={!!errors.name}
              helperText={errors.name}
            />
          </Grid>

          {/* Description Field */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              minRows={4}
              label="Description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                handleFormChange();
              }}
              error={!!errors.description}
              helperText={errors.description}
            />
          </Grid>

          {/* Location Field */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Location"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                handleFormChange();
              }}
              error={!!errors.location}
              helperText={errors.location}
            />
          </Grid>

          {/* Buttons */}
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="outlined"
              color="secondary"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              {initialData.id ? "Update Café" : "Add Café"}
            </Button>
          </Grid>
        </Grid>

        {/* Confirmation Dialog */}
        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          aria-labelledby="alert-dialog-title"
        >
          <DialogTitle id="alert-dialog-title">
            You have unsaved changes. Do you really want to leave?
          </DialogTitle>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)} color="primary">
              Stay
            </Button>
            <Button onClick={confirmLeave} color="secondary" autoFocus>
              Leave
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default CafesForm;
