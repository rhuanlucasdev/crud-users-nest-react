import { Paper } from "@mui/material";
import type { CreateFormState } from "../types/user";

type UsersHeaderCardProps = {
  usersCount: number;
  createForm: CreateFormState;
  searchFilter: string;
  onCreateFormChange: (value: CreateFormState) => void;
  onCreateUser: () => void;
  onSearchFilterChange: (value: string) => void;
  onClearFilter: () => void;
};

export function UsersHeaderCard({
  usersCount,
  createForm,
  searchFilter,
  onCreateFormChange,
  onCreateUser,
  onSearchFilterChange,
  onClearFilter,
}: UsersHeaderCardProps) {
  return (
    <Paper elevation={0} className="hero-card">
      <div className="hero-head">
        <div>
          <h1 className="app-title">Gerenciador de Usuários</h1>
          <p className="app-subtitle">
            Gerencie os cadastros com uma visualização simples e rápida.
          </p>
        </div>
        <span className="users-count">{usersCount} usuários</span>
      </div>

      <div className="form form--compact">
        <input
          placeholder="nome"
          value={createForm.name}
          onChange={(e) =>
            onCreateFormChange({ ...createForm, name: e.target.value })
          }
        />

        <input
          placeholder="email"
          value={createForm.email}
          onChange={(e) =>
            onCreateFormChange({ ...createForm, email: e.target.value })
          }
        />

        <button
          onClick={onCreateUser}
          disabled={!createForm.name.trim() || !createForm.email.trim()}
        >
          Criar usuário
        </button>
      </div>

      <div className="filter-section">
        <input
          className="search-input"
          placeholder="Buscar por nome..."
          value={searchFilter}
          onChange={(e) => onSearchFilterChange(e.target.value)}
        />
        {searchFilter && (
          <button className="btn-clear-filter" onClick={onClearFilter}>
            Limpar
          </button>
        )}
      </div>
    </Paper>
  );
}
