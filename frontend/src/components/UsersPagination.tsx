type UsersPaginationProps = {
  usersLength: number;
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  onChangePage: (newPage: number) => void;
  onChangeItemsPerPage: (value: number) => void;
};

export function UsersPagination({
  usersLength,
  currentPage,
  itemsPerPage,
  totalPages,
  onChangePage,
  onChangeItemsPerPage,
}: UsersPaginationProps) {
  return (
    <div className="pagination-section">
      <div className="pagination-info">
        Mostrando {usersLength === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}{" "}
        a {Math.min(currentPage * itemsPerPage, usersLength)} de {usersLength}{" "}
        usuários
      </div>

      <div className="pagination-controls">
        <div className="items-per-page">
          <label>Por página:</label>
          <select
            value={itemsPerPage}
            onChange={(e) => onChangeItemsPerPage(Number(e.target.value))}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>

        <div className="page-buttons">
          <button
            className="pagination-btn"
            onClick={() => onChangePage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ← Anterior
          </button>

          <div className="page-indicator">
            Página {currentPage} de {totalPages}
          </div>

          <button
            className="pagination-btn"
            onClick={() => onChangePage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Próxima →
          </button>
        </div>
      </div>
    </div>
  );
}
