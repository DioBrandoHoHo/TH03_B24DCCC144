import React from 'react';

interface PaginationProps {
  page: number;
  setPage: (n: number) => void;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ page, setPage, totalPages }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePrev = () => setPage(Math.max(1, page - 1));
  const handleNext = () => setPage(Math.min(totalPages, page + 1));

  return (
    <div className="pagination">
      <button className="btn" onClick={handlePrev} disabled={page === 1}>
        Previous
      </button>
      {pages.map((p) => (
        <button
          key={p}
          className={`btn ${p === page ? 'active' : ''}`}
          onClick={() => setPage(p)}
        >
          {p}
        </button>
      ))}
      <button className="btn" onClick={handleNext} disabled={page === totalPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
