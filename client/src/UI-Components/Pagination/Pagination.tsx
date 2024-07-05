import { Tooltip } from "@nextui-org/react";
import { FC } from "react";
import "./style.css";

interface PaginationProp {
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
  prevPage: () => void;
  nextPage: () => void;
  style?: any;
}

const Pagination: FC<PaginationProp> = ({
  currentPage,
  totalPages,
  goToPage,
  prevPage,
  nextPage,
  style,
}) => {
  return (
    <div className="pagination" style={style && style}>
      <Tooltip content="First Page" color="primary">
        <button
          onClick={() => goToPage(1)}
          disabled={currentPage === 1}
          title="First Page"
        >
          {"<<"}
        </button>
      </Tooltip>

      <Tooltip content="Previous Page" color="primary">
        <button onClick={prevPage} disabled={currentPage === 1}>
          {"<"}
        </button>
      </Tooltip>

      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => goToPage(i + 1)}
          className={currentPage === i + 1 ? "active" : ""}
          id="count"
        >
          {i + 1}
        </button>
      ))}
      <Tooltip content="Next Page" color="primary">
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          {">"}
        </button>
      </Tooltip>

      <Tooltip content="Last Page" color="primary">
        <button
          onClick={() => goToPage(totalPages)}
          disabled={currentPage === totalPages}
        >
          {">>"}
        </button>
      </Tooltip>
    </div>
  );
};

export default Pagination;
