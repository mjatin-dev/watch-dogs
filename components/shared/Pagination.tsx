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
  const setTotalPage = () => {
    const temp = totalRows / rowsPerPage;
    if (Number.isInteger(temp)) {
      return temp - 1;
    } else return Math.trunc(temp);
  };
  const totalPage = setTotalPage();
  const buttonStyles =
    "bg-fade px-6 py-3 rounded-md text-bold text-medium font-DM+Sans mr-2 cursor-pointer ";
  return (
    <div className='flex  items-center mt-4'>
      <div
        className={
          page <= 1
            ? ` ${buttonStyles} text-neutral-400 cursor-not-allowed	`
            : buttonStyles + "text-white"
        }
        onClick={() => page > 1 && onPageChange(1)}
      >
        First
      </div>
      <div
        className={
          page <= 1
            ? ` ${buttonStyles} text-neutral-400	cursor-not-allowed`
            : buttonStyles + "text-white"
        }
        onClick={() => page > 1 && onPageChange(page - 1)}
      >
        {"<"}
      </div>
      <div className={buttonStyles}>
        Pages {page} of {totalPage}
      </div>
      <div
        className={
          page === totalPage
            ? ` ${buttonStyles} text-neutral-400	cursor-not-allowed`
            : buttonStyles + "text-white"
        }
        onClick={() => page < totalPage && onPageChange(page + 1)}
      >
        {">"}
      </div>
      <div
        className={
          page === totalPage
            ? ` ${buttonStyles} text-neutral-400 cursor-not-allowed mr-0	`
            : buttonStyles + "text-white"
        }
        onClick={() => page < totalPage && onPageChange(totalPage)}
      >
        Last
      </div>
    </div>
  );
};

export default Pagination;
