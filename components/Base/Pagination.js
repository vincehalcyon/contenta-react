import { useEffect, useState } from "react";
import Icon from "/Icons/Icon";

const Pagination = (props) => {
  const {
    pagination,
    onPaginate,
    hideTotal = false,
    buttonClass,
    wrapperClass,
    activeClass,
    type = "pages",
    limit = 5,
    compact = false,
  } = props;
  // onPaginate = on change page event
  const { currentPage, perPage, total } = pagination;
  // total = total number of data (not pages)

  const [pages, setPages] = useState([]);
  const totalPages = Math.ceil(total / perPage);

  const startPage =
    currentPage === 1 || currentPage === 2 || totalPages <= limit
      ? 1
      : currentPage === totalPages - 1
      ? totalPages - limit
      : currentPage === totalPages && totalPages > limit
      ? totalPages - limit + 1
      : currentPage - 2;

  const isInFirstPage = currentPage === 1;
  const isInLastPage = currentPage === totalPages;

  const getPages = () => {
    let pagesOnly = [];
    for (
      let i = startPage;
      i <= Math.min(startPage + limit - 1, totalPages);
      i += 1
    ) {
      if (pagesOnly.length <= limit - 1) {
        pagesOnly.push(i);
      }
    }
    return pagesOnly;
  };

  const onChangePage = (page) => {
    if (type !== "simple") {
      let isIncrement = page > currentPage;
      let total_pages = Math.ceil(total / perPage);
      let lastPage = pages[pages.length - 1];
      let startPage = isIncrement
        ? page + 1 === lastPage && lastPage !== total_pages
          ? pages[0] + 1
          : pages[0]
        : page - 1 === pages[0] && pages[0] !== 1
        ? pages[0] - 1
        : pages[0];
      let pagesOnly = [];
      for (let i = startPage; i <= total_pages; i++) {
        if (pagesOnly.length <= 4) {
          pagesOnly.push(i);
        }
      }
      setPages(pagesOnly);
    }
    onPaginate({ ...pagination, currentPage: page });
  };

  return (
    <div
      className={`py-4 px-4 py-4 md:my-8 text-sm flex ${
        wrapperClass ? wrapperClass : ""
      } ${
        hideTotal
          ? "items-center"
          : `w-full flex-col-reverse md:flex-row justify-between ${
              total > 0 ? "items-center" : "items-start"
            }`
      } `}
    >
      {!hideTotal && (
        <p className="mt-2 md:mt-0 text-center md:text-left">Total: {total}</p>
      )}
      {/* whole pagination, show if total pages > 1 */}
      {totalPages > 0 && total > perPage && (
        <div
          className={`mb-5 flex flex-col ${
            compact ? "" : "md:flex-row"
          } text-sm`}
        >
          {/* Small Screens */}
          <div
            className={`flex justify-center ${compact ? "" : "md:hidden"} pb-2`}
          >
            <button
              name="btn-pagerPrev"
              disabled={isInFirstPage}
              onClick={() => onChangePage(1)}
              className={`${
                buttonClass ? buttonClass : ""
              } transition-all pl-3 pr-3 py-3 border mx-1 flex items-center disabled:border-gray-200 disabled:cursor-not-allowed disabled:bg-gray-200 border-gray-400`}
              aria-label="First Page"
            >
              <Icon
                name="double-arrow"
                className={`text-gray-400 transform rotate-180 ${
                  isInFirstPage ? "text-gray-400" : "text-gray-500"
                }`}
                size="12"
              />
            </button>
            <button
              name="btn-pagerPrev"
              disabled={isInFirstPage}
              onClick={() => onChangePage(currentPage - 1)}
              className={`${
                buttonClass ? buttonClass : ""
              } transition-all pl-4 pr-3 py-3 border mx-1 flex items-center disabled:border-gray-200 disabled:cursor-not-allowed disabled:bg-gray-200 border-gray-400`}
              aria-label="Previous Page"
            >
              <span
                className={`w-2 h-2 border-gray-400 border-b-2 border-l-2 transform rotate-45 ${
                  isInFirstPage ? "border-gray-400" : "border-gray-500"
                }`}
              ></span>
            </button>
            <button
              name="btn-pagerNext"
              disabled={isInLastPage}
              onClick={() => onChangePage(currentPage + 1)}
              className={`${buttonClass ? buttonClass : ""} ${
                compact ? "" : "md:hidden"
              } transition-all pr-4 pl-3 py-1 border mx-1 flex items-center disabled:border-gray-200 disabled:cursor-not-allowed disabled:bg-gray-200 border-gray-400 hover:bg-gray-100`}
              aria-label="Next Page"
            >
              <span
                className={`w-2 h-2 border-gray-400 border-t-2 border-r-2 transform rotate-45 ${
                  isInLastPage ? "border-gray-400" : "border-gray-500"
                }`}
              ></span>
            </button>
            <button
              name="btn-pagerNext"
              disabled={isInLastPage}
              onClick={() => onChangePage(Math.ceil(total / perPage))}
              className={`${buttonClass ? buttonClass : ""}  ${
                compact ? "" : "md:hidden"
              } transition-all pr-3 pl-3 py-1 border mx-1 flex items-center disabled:border-gray-200 disabled:cursor-not-allowed disabled:bg-gray-200 border-gray-400 hover:bg-gray-100`}
              aria-label="Next Page"
            >
              <Icon
                name="double-arrow"
                className={`text-gray-400 ${
                  isInLastPage ? "text-gray-400" : "text-gray-500"
                }`}
                size="12"
              />
            </button>
          </div>

          {/* Wide Screen */}
          {/* First Page */}
          <button
            name="btn-pagerFirst"
            disabled={isInFirstPage}
            onClick={() => onChangePage(1)}
            className={`${
              buttonClass ? buttonClass : ""
            } hidden transition-all pl-3 pr-3 py-3 mx-1 ${
              compact ? "" : "md:flex"
            } items-center hover:bg-black hover:text-white disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed disabled:bg-transparent border-gray-400`}
            aria-label="First Page"
          >
            <Icon
              name="double-arrow"
              className={`text-gray-400 transform rotate-180 ${
                isInFirstPage ? "text-gray-400" : "text-gray-500"
              }`}
              size="12"
            />
            {/* {type === "simple" ? <span className="pl-2">First</span> : ""} */}
          </button>
          {/* prev button */}
          <button
            name="btn-pagerPrev"
            disabled={isInFirstPage}
            onClick={() => onChangePage(currentPage - 1)}
            className={`${
              buttonClass ? buttonClass : ""
            } hidden transition-all pl-4 pr-3 py-3 mx-1 ${
              compact ? "" : "md:flex"
            } items-center hover:bg-black hover:text-white disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed disabled:bg-transparent border-gray-400`}
            aria-label="Previous Page"
          >
            <span
              className={`w-2 h-2 border-gray-400 border-b-2 border-l-2 transform rotate-45 ${
                isInFirstPage ? "border-gray-400" : "border-gray-500"
              }`}
            ></span>
            {type === "simple" ? <span className="pl-2">Prev</span> : ""}
          </button>

          {/* pages 1,2,3,... */}
          {type !== "simple" && (
            <div className="flex justify-center items-center md:justify-start">
              {/* {pages()} */}
              {getPages() &&
                getPages().map((page) => {
                  return (
                    <button
                      name={`btn-page-${page}`}
                      key={page}
                      onClick={() => onChangePage(page)}
                      disabled={currentPage === page || totalPages === 1}
                      className={`${
                        buttonClass ? buttonClass : ""
                      } px-4 py-2 mx-1 transition-all h-full ${
                        currentPage === page
                          ? activeClass
                            ? activeClass
                            : "bg-[#DE4523] text-white cursor-default rounded-[4px] px-[12px]"
                          : "text-gray-500 border-gray-400 hover:bg-black hover:text-white"
                      }`}
                      aria-label={`Page ${page}`}
                    >
                      {page}
                    </button>
                  );
                })}
            </div>
          )}
          {/* next button */}
          <button
            name="btn-pagerNext"
            disabled={isInLastPage}
            onClick={() => onChangePage(currentPage + 1)}
            className={`${
              buttonClass ? buttonClass : ""
            } hidden transition-all pr-4 pl-3 py-1 mx-1 ${
              compact ? "" : "md:flex"
            } items-center hover:bg-black hover:text-white disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed disabled:bg-transparent border-gray-400 hover:bg-gray-100`}
            aria-label="Next Page"
          >
            {type === "simple" ? <span className="pr-2">Next</span> : ""}
            <span
              className={`w-2 h-2 border-gray-400 border-t-2 border-r-2 transform rotate-45 ${
                isInLastPage ? "border-gray-400" : "border-gray-500"
              }`}
            ></span>
          </button>
          <button
            name="btn-pagerLast"
            disabled={isInLastPage}
            onClick={() => onChangePage(Math.ceil(total / perPage))}
            className={`${
              buttonClass ? buttonClass : ""
            } hidden transition-all pr-3 pl-3 py-1 mx-1 ${
              compact ? "" : "md:flex"
            } items-center hover:bg-black hover:text-white disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed disabled:bg-transparent border-gray-400 hover:bg-gray-100`}
            aria-label="Last Page"
          >
            {/* {type === "simple" ? <span className="pr-2">Lsst</span> : ""} */}
            <Icon
              name="double-arrow"
              className={`text-gray-400 ${
                isInLastPage ? "text-gray-400" : "text-gray-500"
              }`}
              size="12"
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default Pagination;
