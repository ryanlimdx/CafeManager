import { Container, Typography } from "@mui/material";
import { useNavigate, useLocation } from "@tanstack/react-router";
import React from "react";
import { FormDirtyContext } from "../context/DirtyContext";

const Navbar = () => {
  const { isFormDirty } = React.useContext(FormDirtyContext);
  const navigate = useNavigate();

  // Confirm if users want to switch to different tabs (if there are unsaved forms)
  const handleNavigation = (path) => {
    if (isFormDirty) {
      const confirmLeave = window.confirm(
        "You have unsaved changes. Are you sure you want to leave this page?"
      );
      if (!confirmLeave) return;
    }
    navigate({ to: path });
  };

  const location = useLocation();
  const isCafes =
    location.pathname === "/" ||
    location.pathname === "/add-cafe" ||
    location.pathname.includes("/edit-cafe");
  const isEmployees =
    location.pathname === "/employees" ||
    location.pathname === "/add-employee" ||
    location.pathname.includes("/edit-employee");

  return (
    <Container
      style={{ paddingTop: "20px", paddingBottom: "20px" }}
    >
      <div style={{ display: "flex", gap: "15px", alignItems: "flex-end" }}>
        <span
          onClick={() => handleNavigation("/")}
          style={{ textDecoration: "none", cursor: "pointer" }}
        >
          <Typography
            variant={isCafes ? "h4" : "h6"}
            style={{ color: isCafes ? "black" : "grey" }}
          >
            Café
          </Typography>
        </span>
        <span
          onClick={() => handleNavigation("/employees")}
          style={{ textDecoration: "none", cursor: "pointer" }}
        >
          <Typography
            variant={isEmployees ? "h4" : "h6"}
            style={{ color: isEmployees ? "black" : "grey" }}
          >
            Employee
          </Typography>
        </span>
      </div>
    </Container>
  );
};

export default Navbar;
