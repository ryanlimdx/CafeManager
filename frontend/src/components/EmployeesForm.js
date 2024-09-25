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
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useBeforeUnload } from "react-router-dom";
import { FormDirtyContext } from "../context/DirtyContext";

const EmployeesForm = ({
  initialData = {},
  onSubmit,
  onCancel,
  cafesList = [],
}) => {
  const [name, setName] = useState(initialData.name || "");
  const [email, setEmail] = useState(initialData.email_address || "");
  const [phone, setPhone] = useState(initialData.phone_number || "");
  const [gender, setGender] = useState(initialData.gender || "");
  const [cafe, setCafe] = useState(initialData.cafe?.id || "");
  const [openDialog, setOpenDialog] = useState(false);
  const { isFormDirty, setIsFormDirty } = React.useContext(FormDirtyContext);

  // Loads preset data if it comes in later
  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setEmail(initialData.email_address || "");
      setPhone(initialData.phone_number || "");
      setGender(initialData.gender || "");
      setCafe(initialData.cafe?.id || "");
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

    // Name validation
    if (name.length < 6 || name.length > 10) {
      newErrors.name = "Name must be between 6 and 10 characters.";
    }

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // SG Phone validation
    const phoneRegex = /^[89]\d{7}$/;
    if (!phone || !phoneRegex.test(phone)) {
      newErrors.phone = "Please enter a valid 8-digit SG phone number.";
    }

    if (!gender) {
      newErrors.gender = "Please select a gender.";
    }

    if (!cafe) {
      newErrors.cafe = "Please select an assigned café.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = () => {
    if (validate()) {
      onSubmit({
        name,
        email_address: email,
        phone_number: phone,
        gender,
        cafe,
      });
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
          {initialData.id ? "Edit Employee" : "Add Employee"}
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

          {/* Email Field */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email Address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                handleFormChange();
              }}
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>

          {/* Phone Number Field */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone Number"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                handleFormChange();
              }}
              error={!!errors.phone}
              helperText={errors.phone}
            />
          </Grid>

          {/* Gender Radio Button Group */}
          <Grid item xs={12}>
            <FormControl>
              <FormLabel>Gender</FormLabel>
              <RadioGroup
                row
                value={gender}
                onChange={(e) => {
                  setGender(e.target.value);
                  handleFormChange();
                }}
              >
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
              </RadioGroup>
              {errors.gender && (
                <Typography color="error">{errors.gender}</Typography>
              )}
            </FormControl>
          </Grid>

          {/* Assigned Cafe Dropdown */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <FormLabel>Assign a Café</FormLabel>
              <Select
                value={cafe}
                onChange={(e) => {
                  setCafe(e.target.value);
                  handleFormChange();
                }}
                displayEmpty
                error={!!errors.cafe}
              >
                <MenuItem value="" disabled>
                  Select a Café
                </MenuItem>
                {cafesList.map((cafeItem) => (
                  <MenuItem key={cafeItem.id} value={cafeItem.id}>
                    {cafeItem.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.cafe && (
                <Typography color="error">{errors.cafe}</Typography>
              )}
            </FormControl>
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
              {initialData.id ? "Update Employee" : "Add Employee"}
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

export default EmployeesForm;
