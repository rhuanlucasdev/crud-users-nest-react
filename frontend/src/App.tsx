import { AppToast } from "./components/AppToast";
import { DeleteConfirmDialog } from "./components/DeleteConfirmDialog";
import { EditUserDialog } from "./components/EditUserDialog";
import { UsersHeaderCard } from "./components/UsersHeaderCard";
import { UsersPagination } from "./components/UsersPagination";
import { UsersTable } from "./components/UsersTable";
import { useUsers } from "./hooks/useUsers";

function App() {
  const {
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
  } = useUsers();

  return (
    <main className="container">
      <UsersHeaderCard
        usersCount={users.length}
        createForm={createForm}
        searchFilter={searchFilter}
        onCreateFormChange={setCreateForm}
        onCreateUser={createUser}
        onSearchFilterChange={setSearchFilter}
        onClearFilter={handleClearFilter}
      />

      <UsersTable
        users={paginatedUsers}
        onEditUser={handleOpenEdit}
        onDeleteUser={handleOpenDeleteConfirm}
      />

      <UsersPagination
        usersLength={users.length}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalPages={totalPages}
        onChangePage={handleChangePage}
        onChangeItemsPerPage={handleChangeItemsPerPage}
      />

      <EditUserDialog
        open={openEdit}
        editForm={editForm}
        onClose={closeEditDialog}
        onEditFormChange={setEditForm}
        onSave={handleUpdate}
      />

      <DeleteConfirmDialog
        open={openDeleteConfirm}
        userName={userToDelete?.name}
        onClose={closeDeleteConfirm}
        onConfirm={handleConfirmDelete}
      />

      <AppToast
        open={toastOpen}
        message={toastMessage}
        severity={toastSeverity}
        onClose={closeToast}
      />
    </main>
  );
}

export default App;
