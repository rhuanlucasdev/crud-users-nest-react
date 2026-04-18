import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import type { User } from "../types/user";

type UsersTableProps = {
  users: User[];
  onEditUser: (user: User) => void;
  onDeleteUser: (user: User) => void;
};

export function UsersTable({
  users,
  onEditUser,
  onDeleteUser,
}: UsersTableProps) {
  return (
    <TableContainer component={Paper} className="users-table">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className="col-id">ID</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Email</TableCell>
            <TableCell className="col-actions">Ações</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} align="center" className="empty-cell">
                Nenhum usuário cadastrado ainda.
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
                      onClick={() => onEditUser(user)}
                      variant="contained"
                      size="small"
                    >
                      Editar
                    </Button>
                    <Button
                      className="btn-danger"
                      onClick={() => onDeleteUser(user)}
                      variant="contained"
                      size="small"
                    >
                      Excluir
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
