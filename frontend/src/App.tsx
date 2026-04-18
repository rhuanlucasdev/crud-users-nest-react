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

  const fetchUsers = async () => {
    const response = await api.get("/users");
    setUsers(response.data);
  };

  const createUser = async () => {
    await api.post("/users", { name, email });
    setName("");
    setEmail("");
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container">
      <h1>User Manager</h1>

      <div className="form">
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

        <button onClick={createUser}>Create</button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default App;
