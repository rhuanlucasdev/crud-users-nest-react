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

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState<"success" | "error">("success");

  const fetchUsers = async () => {
    const response = await api.get("/users");
    const sortedUsers = (response.data as User[]).sort((a, b) => a.id - b.id);
    setUsers(sortedUsers);
  };

  const showToast = (message: string, severity: "success" | "error" = "success") => {
    setToastMessage(message);
    setToastSeverity(severity);
    setToastOpen(true);
  };

  const createUser = async () => {
    try {
      await api.post("/users", { name, email });
      setName("");
      setEmail("");
      fetchUsers();
      showToast("Usuário criado com sucesso!", "success");
    } catch (error) {
      showToast("Erro ao criar usuário", "error");
    }
  };

  const deleteUser = async (id: number) => {
    try {
      await api.delete(`/users/${id}`);
      fetchUsers();
      showToast("Usuário deletado com sucesso!", "success");
    } catch (error) {
      showToast("Erro ao deletar usuário", "error");
    }
  };

  const handleOpenEdit = (user: User) => {
    setSelectedUserId(user.id);
    setEditName(user.name);
    setEditEmail(user.email);
    setOpenEdit(true);
  };

  const handleUpdate = async () => {
    if (!selectedUserId) return;

    try {
      await api.patch(`/users/${selectedUserId}`, {
        name: editName,
        email: editEmail,
      });

      setOpenEdit(false);
      fetchUsers();
      showToast("Usuário atualizado com sucesso!", "success");
    } catch (error) {
      showToast("Erro ao atualizar usuário", "error");
    }
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
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button onClick={createUser} disabled={!name.trim() || !email.trim()}>
            Create user
          </button>
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
                        onClick={() => deleteUser(user.id)}
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
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />

            <input
              placeholder="email"
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
            />
          </div>
        </DialogContent>

        <DialogActions>
          <button className="btn-danger" onClick={() => setOpenEdit(false)}>
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            disabled={!editName.trim() || !editEmail.trim()}
          >
            Save
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
          sx={{ width: "100%" }}
        >
          {toastMessage}
        </Alert>
      </Snackbar>
    </main>
  );
}

export default App;
