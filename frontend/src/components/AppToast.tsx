import { Snackbar, Alert } from "@mui/material";
import type { ToastSeverity } from "../types/user";

type AppToastProps = {
  open: boolean;
  message: string;
  severity: ToastSeverity;
  onClose: () => void;
};

export function AppToast({ open, message, severity, onClose }: AppToastProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        sx={{
          width: "100%",
          backgroundColor: severity === "success" ? "#22c55e" : "#ef4444",
          color: "#ffffff",
          fontWeight: 600,
          fontSize: "14px",
          "& .MuiAlert-icon": {
            color: "#ffffff",
          },
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
