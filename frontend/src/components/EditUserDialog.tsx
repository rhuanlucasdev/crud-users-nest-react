import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import type { EditFormState } from "../types/user";

type EditUserDialogProps = {
  open: boolean;
  editForm: EditFormState;
  onClose: () => void;
  onEditFormChange: (value: EditFormState) => void;
  onSave: () => void;
};

export function EditUserDialog({
  open,
  editForm,
  onClose,
  onEditFormChange,
  onSave,
}: EditUserDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Editar Usuário</DialogTitle>
      <DialogContent>
        <div className="form form--dialog">
          <input
            placeholder="nome"
            value={editForm.name}
            onChange={(e) =>
              onEditFormChange({ ...editForm, name: e.target.value })
            }
          />

          <input
            placeholder="email"
            value={editForm.email}
            onChange={(e) =>
              onEditFormChange({ ...editForm, email: e.target.value })
            }
          />
        </div>
      </DialogContent>

      <DialogActions>
        <button className="btn-danger" onClick={onClose}>
          Cancelar
        </button>
        <button
          onClick={onSave}
          disabled={!editForm.name.trim() || !editForm.email.trim()}
        >
          Salvar
        </button>
      </DialogActions>
    </Dialog>
  );
}
