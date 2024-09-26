// To warn users when there is unsaved form data before navigating away (via Navbar)
import React, { createContext, useState } from 'react';

export const FormDirtyContext = createContext();

export const FormDirtyProvider = ({ children }) => {
  const [isFormDirty, setIsFormDirty] = useState(false);

  return (
    <FormDirtyContext.Provider value={{ isFormDirty, setIsFormDirty }}>
      {children}
    </FormDirtyContext.Provider>
  );
};