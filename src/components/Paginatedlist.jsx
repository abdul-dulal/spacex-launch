import React, { useState } from "react";

function PaginatedList() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items to display per page
  const totalItems = 100; // Total number of items in your list (adjust as needed)

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Calculate the visible page range
  const pageRange = 5; // Number of pages to display before and after the current page
  const visiblePages = [];
  for (
    let i = Math.max(currentPage - pageRange, 1);
    i <= Math.min(currentPage + pageRange, totalPages);
    i++
  ) {
    visiblePages.push(i);
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <ul className="pagination">
        <li>
          <button onClick={handlePreviousPage}>Previous</button>
        </li>
        {visiblePages[0] > 1 && (
          <li>
            <button onClick={() => setCurrentPage(1)}>1</button>
          </li>
        )}
        {visiblePages[0] > 2 && (
          <li>
            <span>...</span>
          </li>
        )}
        {visiblePages.map((page) => (
          <li key={page}>
            <button
              onClick={() => setCurrentPage(page)}
              className={page === currentPage ? "active" : ""}
            >
              {page}
            </button>
          </li>
        ))}
        {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
          <li>
            <span>...</span>
          </li>
        )}
        {visiblePages[visiblePages.length - 1] < totalPages && (
          <li>
            <button onClick={() => setCurrentPage(totalPages)}>
              {totalPages}
            </button>
          </li>
        )}
        <li>
          <button onClick={handleNextPage}>Next</button>
        </li>
      </ul>
    </div>
  );
}

export default PaginatedList;
