import React from "react";

type PaginationProps = {
  totalRows: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (pageNumber: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalRows,
  onPageChange,
  rowsPerPage,
}) => {
  const totalPage = totalRows / rowsPerPage;

  const buttonStyles =
    "bg-fade px-6 py-3 rounded-md text-bold text-white font-DM+Sans mr-2 cursor-pointer ";
  return (
    <div className='flex  items-center mt-4'>
      <div className={buttonStyles} onClick={() => onPageChange(0)}>
        First
      </div>
      <div className={buttonStyles} onClick={() => onPageChange(page - 1)}>
        {"<"}
      </div>
      <div className={buttonStyles}>
        Pages {page} of {totalPage}
      </div>
      <div className={buttonStyles} onClick={() => onPageChange(page + 1)}>
        {">"}
      </div>
      <div
        className={`${buttonStyles} mr-0 `}
        onClick={() => onPageChange(totalPage)}
      >
        Last
      </div>
    </div>
  );
};

export default Pagination;
