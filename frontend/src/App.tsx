import { useEffect, useState } from "react";
import { api } from "./services/api";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";

type User = {
  id: number;
  name: string;
  email: string;
};

interface CreateFormState {
  name: string;
  email: string;
}

interface EditFormState {
  name: string;
  email: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [createForm, setCreateForm] = useState<CreateFormState>({
    name: "",
    email: "",
  });
  const [editForm, setEditForm] = useState<EditFormState>({
    name: "",
    email: "",
  });
  const [searchFilter, setSearchFilter] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState<"success" | "error">(
    "success",
  );

  const fetchUsers = async (filter: string = "") => {
    const params = filter ? { name: filter } : {};
    const response = await api.get("/users", { params });
    const sortedUsers = (response.data as User[]).sort((a, b) => a.id - b.id);
    setUsers(sortedUsers);
  };

  useEffect(() => {
    fetchUsers(searchFilter);
  }, [searchFilter]);

  const showToast = (
    message: string,
    severity: "success" | "error" = "success",
  ) => {
    setToastMessage(message);
    setToastSeverity(severity);
    setToastOpen(true);
  };

  const createUser = async () => {
    try {
      await api.post("/users", {
        name: createForm.name,
        email: createForm.email,
      });
      setCreateForm({ name: "", email: "" });
      fetchUsers(searchFilter);
      showToast("Usuário criado com sucesso!", "success");
    } catch (error) {
      showToast("Erro ao criar usuário", "error");
    }
  };

  const handleOpenDeleteConfirm = (user: User) => {
    setUserToDelete(user);
    setOpenDeleteConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;

    try {
      await api.delete(`/users/${userToDelete.id}`);
      setOpenDeleteConfirm(false);
      setUserToDelete(null);
      fetchUsers(searchFilter);
      showToast("Usuário deletado com sucesso!", "success");
    } catch (error) {
      showToast("Erro ao deletar usuário", "error");
    }
  };

  const handleOpenEdit = (user: User) => {
    setSelectedUserId(user.id);
    setEditForm({ name: user.name, email: user.email });
    setOpenEdit(true);
  };

  const handleUpdate = async () => {
    if (!selectedUserId) return;

    try {
      await api.patch(`/users/${selectedUserId}`, {
        name: editForm.name,
        email: editForm.email,
      });

      setOpenEdit(false);
      fetchUsers(searchFilter);
      showToast("Usuário atualizado com sucesso!", "success");
    } catch (error) {
      showToast("Erro ao atualizar usuário", "error");
    }
  };

  const handleClearFilter = () => {
    setSearchFilter("");
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <main className="container">
      <Paper elevation={0} className="hero-card">
        <div className="hero-head">
          <div>
            <h1 className="app-title">User Manager</h1>
            <p className="app-subtitle">
              Gerencie os cadastros com uma visualizacao simples e rapida.
            </p>
          </div>
          <span className="users-count">{users.length} usuarios</span>
        </div>

        <div className="form form--compact">
          <input
            placeholder="name"
            value={createForm.name}
            onChange={(e) =>
              setCreateForm({ ...createForm, name: e.target.value })
            }
          />

          <input
            placeholder="email"
            value={createForm.email}
            onChange={(e) =>
              setCreateForm({ ...createForm, email: e.target.value })
            }
          />

          <button
            onClick={createUser}
            disabled={!createForm.name.trim() || !createForm.email.trim()}
          >
            Create user
          </button>
        </div>

        <div className="filter-section">
          <input
            className="search-input"
            placeholder="Buscar por nome..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
          />
          {searchFilter && (
            <button className="btn-clear-filter" onClick={handleClearFilter}>
              Limpar
            </button>
          )}
        </div>
      </Paper>

      <TableContainer component={Paper} className="users-table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="col-id">ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell className="col-actions">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center" className="empty-cell">
                  Nenhum usuario cadastrado ainda.
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id} hover>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <div className="row-actions">
                      <Button
                        className="btn-edit"
                        onClick={() => handleOpenEdit(user)}
                        variant="contained"
                        size="small"
                      >
                        Edit
                      </Button>
                      <Button
                        className="btn-danger"
                        onClick={() => handleOpenDeleteConfirm(user)}
                        variant="contained"
                        size="small"
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <div className="form form--dialog">
            <input
              placeholder="name"
              value={editForm.name}
              onChange={(e) =>
                setEditForm({ ...editForm, name: e.target.value })
              }
            />

            <input
              placeholder="email"
              value={editForm.email}
              onChange={(e) =>
                setEditForm({ ...editForm, email: e.target.value })
              }
            />
          </div>
        </DialogContent>

        <DialogActions>
          <button className="btn-danger" onClick={() => setOpenEdit(false)}>
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            disabled={!editForm.name.trim() || !editForm.email.trim()}
          >
            Save
          </button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDeleteConfirm}
        onClose={() => setOpenDeleteConfirm(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <p>
            Tem certeza que deseja deletar o usuário{" "}
            <strong>{userToDelete?.name}</strong>? Esta ação é irreversível.
          </p>
        </DialogContent>

        <DialogActions>
          <button
            className="btn-danger"
            onClick={() => setOpenDeleteConfirm(false)}
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirmDelete}
            style={{ background: "#ef4444", color: "white" }}
          >
            Deletar
          </button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={toastOpen}
        autoHideDuration={4000}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setToastOpen(false)}
          severity={toastSeverity}
          sx={{
            width: "100%",
            backgroundColor:
              toastSeverity === "success" ? "#22c55e" : "#ef4444",
            color: "#ffffff",
            fontWeight: 600,
            fontSize: "14px",
            "& .MuiAlert-icon": {
              color: "#ffffff",
            },
          }}
        >
          {toastMessage}
        </Alert>
      </Snackbar>
    </main>
  );
}

export default App;
