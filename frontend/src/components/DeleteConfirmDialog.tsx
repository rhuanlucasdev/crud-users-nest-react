import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

type DeleteConfirmDialogProps = {
  open: boolean;
  userName?: string;
  onClose: () => void;
  onConfirm: () => void;
};

export function DeleteConfirmDialog({
  open,
  userName,
  onClose,
  onConfirm,
}: DeleteConfirmDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Confirmar Exclusão</DialogTitle>
      <DialogContent>
        <p>
          Tem certeza que deseja excluir o usuário <strong>{userName}</strong>?
          Esta ação é irreversível.
        </p>
      </DialogContent>

      <DialogActions>
        <button className="btn-danger" onClick={onClose}>
          Cancelar
        </button>
        <button className="btn-danger" onClick={onConfirm}>
          Deletar
        </button>
      </DialogActions>
    </Dialog>
  );
}
