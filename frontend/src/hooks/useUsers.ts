import { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { api } from "../services/api";
import type {
  CreateFormState,
  EditFormState,
  ToastSeverity,
  User,
} from "../types/user";

export function useUsers() {
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
  const [toastSeverity, setToastSeverity] = useState<ToastSeverity>("success");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [debouncedSearchFilter, setDebouncedSearchFilter] = useState("");
  const hasShownListErrorRef = useRef(false);

  const fetchUsers = async (filter: string = "", signal?: AbortSignal) => {
    const params = filter ? { name: filter } : {};
    const response = await api.get("/users", { params, signal });
    const sortedUsers = (response.data as User[]).sort((a, b) => a.id - b.id);
    setUsers(sortedUsers);
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedSearchFilter(searchFilter);
    }, 400);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [searchFilter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchFilter]);

  const showToast = (message: string, severity: ToastSeverity = "success") => {
    setToastMessage(message);
    setToastSeverity(severity);
    setToastOpen(true);
  };

  const isCanceledRequest = (error: unknown) => {
    const maybeCanceled = error as { code?: string; name?: string };
    return (
      maybeCanceled?.code === "ERR_CANCELED" ||
      maybeCanceled?.name === "CanceledError"
    );
  };

  const getListErrorMessage = (error: unknown) => {
    if (!axios.isAxiosError(error)) {
      return "Não foi possível carregar a listagem de usuários.";
    }

    const status = error.response?.status;

    if (status === 404) {
      return "Endpoint de usuários não encontrado.";
    }

    if (status && status >= 500) {
      return "Erro do servidor ao carregar usuários. Tente novamente.";
    }

    return "Não foi possível carregar a listagem de usuários.";
  };

  useEffect(() => {
    const controller = new AbortController();

    const loadUsers = async () => {
      try {
        await fetchUsers(debouncedSearchFilter, controller.signal);
        hasShownListErrorRef.current = false;
      } catch (error) {
        if (isCanceledRequest(error)) {
          return;
        }

        if (!hasShownListErrorRef.current) {
          showToast(getListErrorMessage(error), "error");
          hasShownListErrorRef.current = true;
        }
      }
    };

    loadUsers();

    return () => {
      controller.abort();
    };
  }, [debouncedSearchFilter]);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return users.slice(startIndex, endIndex);
  }, [users, currentPage, itemsPerPage]);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(users.length / itemsPerPage));
  }, [users.length, itemsPerPage]);

  const getApiErrorMessage = (error: unknown, action: string) => {
    if (!axios.isAxiosError(error)) {
      return `Erro ao ${action} usuário`;
    }

    const status = error.response?.status;
    const data = error.response?.data as
      | { message?: string | string[] }
      | undefined;

    if (Array.isArray(data?.message) && data.message.length > 0) {
      return data.message.join("; ");
    }

    if (typeof data?.message === "string") {
      if (data.message.includes("Unique constraint failed")) {
        return "Este e-mail já está em uso.";
      }
      return data.message;
    }

    if (status === 400) {
      return "Dados inválidos. Verifique os campos e tente novamente.";
    }

    if (status === 404) {
      return "Usuário não encontrado.";
    }

    if (status === 409) {
      return "Conflito de dados. Verifique se o e-mail já existe.";
    }

    if (status && status >= 500) {
      return "Erro interno do servidor. Tente novamente em instantes.";
    }

    return `Erro ao ${action} usuário`;
  };

  const closeToast = () => {
    setToastOpen(false);
  };

  const createUser = async () => {
    try {
      await api.post("/users", {
        name: createForm.name,
        email: createForm.email,
      });
      setCreateForm({ name: "", email: "" });

      try {
        await fetchUsers(searchFilter);
        hasShownListErrorRef.current = false;
        showToast("Usuário criado com sucesso!", "success");
      } catch {
        showToast(
          "Usuário criado, mas não foi possível atualizar a listagem.",
          "error",
        );
      }
    } catch (error) {
      showToast(getApiErrorMessage(error, "criar"), "error");
    }
  };

  const handleOpenDeleteConfirm = (user: User) => {
    setUserToDelete(user);
    setOpenDeleteConfirm(true);
  };

  const closeDeleteConfirm = () => {
    setOpenDeleteConfirm(false);
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;

    try {
      await api.delete(`/users/${userToDelete.id}`);
      setOpenDeleteConfirm(false);
      setUserToDelete(null);

      try {
        await fetchUsers(searchFilter);
        hasShownListErrorRef.current = false;
        showToast("Usuário deletado com sucesso!", "success");
      } catch {
        showToast(
          "Usuário excluído, mas não foi possível atualizar a listagem.",
          "error",
        );
      }
    } catch (error) {
      showToast(getApiErrorMessage(error, "deletar"), "error");
    }
  };

  const handleOpenEdit = (user: User) => {
    setSelectedUserId(user.id);
    setEditForm({ name: user.name, email: user.email });
    setOpenEdit(true);
  };

  const closeEditDialog = () => {
    setOpenEdit(false);
  };

  const handleUpdate = async () => {
    if (!selectedUserId) return;

    try {
      await api.patch(`/users/${selectedUserId}`, {
        name: editForm.name,
        email: editForm.email,
      });

      setOpenEdit(false);

      try {
        await fetchUsers(searchFilter);
        hasShownListErrorRef.current = false;
        showToast("Usuário atualizado com sucesso!", "success");
      } catch {
        showToast(
          "Usuário atualizado, mas não foi possível atualizar a listagem.",
          "error",
        );
      }
    } catch (error) {
      showToast(getApiErrorMessage(error, "atualizar"), "error");
    }
  };

  const handleClearFilter = () => {
    setSearchFilter("");
  };

  const handleChangePage = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleChangeItemsPerPage = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  return {
    users,
    createForm,
    editForm,
    searchFilter,
    openEdit,
    openDeleteConfirm,
    userToDelete,
    toastOpen,
    toastMessage,
    toastSeverity,
    currentPage,
    itemsPerPage,
    paginatedUsers,
    totalPages,
    setCreateForm,
    setEditForm,
    setSearchFilter,
    createUser,
    handleOpenDeleteConfirm,
    closeDeleteConfirm,
    handleConfirmDelete,
    handleOpenEdit,
    closeEditDialog,
    handleUpdate,
    handleClearFilter,
    closeToast,
    handleChangePage,
    handleChangeItemsPerPage,
  };
}
