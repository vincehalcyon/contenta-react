import React, { useState, useEffect } from 'react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
const Pagination = props => {
   const { pagination, onPaginate, hideTotal = false, buttonClass, wrapperClass, activeClass, type = "pages" } = props
   // onPaginate = on change page event
   const { currentPage, perPage, total } = pagination
   // total = total number of data (not pages)

   const [pages, setPages] = useState([])
   const [initialLoad, setInitialLoad] = useState(true)

   const getTotalPages = () => {
      // get total pages
      return Math.ceil(total / perPage)
   }

   const getPages = (total, perPage) => {
      let total_pages = Math.ceil(total / perPage)
      let pagesOnly = []
      for (let i = 1; i <= total_pages; i++) {
         if (pagesOnly.length <= 4) {
            pagesOnly.push(i)
         }
      }
      return pagesOnly
   }

   const onChangePage = page => {
      if (type !== 'simple') {
         let isIncrement = page > currentPage
         let total_pages = Math.ceil(total / perPage)
         let lastPage = pages[pages.length - 1]
         let startPage = isIncrement ? page + 1 === lastPage && lastPage !== total_pages ? pages[0] + 1 : pages[0] : page - 1 === pages[0] && pages[0] !== 1 ? pages[0] - 1 : pages[0]
         let pagesOnly = []
         for (let i = startPage; i <= total_pages; i++) {
            if (pagesOnly.length <= 4) {
               pagesOnly.push(i)
            }
         }
         setPages(pagesOnly)
      }
      onPaginate({ ...pagination, currentPage: page })
   }

   // const pages = () => {
   //   // pages 1, 2, ...
   //   const total_pages = getTotalPages()
   //   const pages = []
   //   const pagesOnly = []
   //   let startPage = currentPage === 1 && currentPage <= total_pages ? currentPage : currentPage - 2
   //   let lastPageDisplayed = 0

   //   for (let i = 1; i <= total_pages; i++) {
   //     if (pages.length <= 4) {
   //       pages.push(
   //         <button
   //           name={`btn-page-${i}`}
   //           key={i}
   //           onClick={() => onPaginate({ ...pagination, currentPage: i })}
   //           disabled={currentPage === i || getTotalPages() === 1}
   //           className={`${buttonClass} px-4 py-2 border mx-1 transition-all ${currentPage === i ? activeClass ? activeClass : 'bg-gray-400 text-white cursor-default' : 'text-gray-900 border-gray-400 hover:bg-black hover:text-white'}`}>
   //           {i}
   //         </button>)
   //     } 

   //   }
   //   return pages
   // }

   return (
      <div className={`py-4 px-4 py-4 md:my-8 text-sm flex items-center ${wrapperClass} ${hideTotal ? '' : 'w-full flex items-center justify-between'} `}>
         {!hideTotal && <p>Total: {total}</p>}
         {/* whole pagination, show if total pages > 1 */}
         {(getTotalPages() > 0 && total > perPage) &&
            <div className="flex flex-col md:flex-row text-sm">
               {/* Small Screens */}
               <div className="flex justify-center md:hidden pb-2">
                  <button
                     name="btn-pagerPrev"
                     disabled={currentPage === 1 || getTotalPages() === 1}
                     onClick={() => onChangePage(currentPage - 1)}
                     className={`${buttonClass} transition-all pl-4 pr-3 py-3 border mx-1 flex items-center hover:bg-black disabled:border-gray-200 disabled:cursor-not-allowed disabled:bg-gray-200 border-gray-400`}>
                     <span className={`w-2 h-2 border-gray-400 border-b-2 border-l-2 transform rotate-45 ${currentPage === 1 || getTotalPages() === 1 ? 'border-gray-400' : 'border-gray-500'}`}></span>
                  </button>
                  <button
                     name="btn-pagerNext"
                     disabled={currentPage === getTotalPages() || getTotalPages() === 1}
                     onClick={() => onChangePage(currentPage + 1)}
                     className={`${buttonClass} md:hidden transition-all pr-4 pl-3 py-1 border mx-1 flex items-center hover:bg-black disabled:border-gray-200 disabled:cursor-not-allowed disabled:bg-gray-200 border-gray-400 hover:bg-gray-100`}>
                     <span className={`w-2 h-2 border-gray-400 border-t-2 border-r-2 transform rotate-45 ${currentPage === getTotalPages() || getTotalPages() === 1 ? 'border-gray-400' : 'border-gray-500'}`}></span>
                  </button>
               </div>
               {/* prev button */}
               <button
                  name="btn-pagerPrev"
                  disabled={currentPage === 1 || getTotalPages() === 1}
                  onClick={() => onChangePage(currentPage - 1)}
                  className={`${buttonClass} hidden transition-all rounded-md md:flex items-center text-contenta-blue hover:text-white hover:bg-contenta-blue disabled:text-gray-800 disabled:border-gray-200 disabled:cursor-not-allowed disabled:bg-gray-200 border-gray-400`}>
                  <span className={`${currentPage === 1 || getTotalPages() === 1 ? 'border-gray-400' : 'border-gray-500'}`}><BiChevronLeft size={24} /></span>
                  {type === 'simple' ? <span className="pl-2">Prev</span> : ''}
               </button>

               {/* pages 1,2,3,... */}
               {type !== 'simple' && <div className="flex">
                  {/* {pages()} */}
                  {getPages(total, perPage) && getPages(total, perPage).map(page => {
                     return (
                        <button
                           name={`btn-page-${page}`}
                           key={page}
                           onClick={() => onChangePage(page)}
                           disabled={currentPage === page || getTotalPages() === 1}
                           className={`${buttonClass} px-4 py-2 mx-1 transition-all ${currentPage === page ? activeClass ? activeClass : 'bg-gray-400 text-white cursor-default ' : 'text-gray-900 border-gray-400 hover:text-white hover:rounded-md hover:bg-contenta-blue hover:font-montserratBold'}`}>
                           {page}
                        </button>
                     )
                  })}
               </div>}
               {/* next button */}
               <button
                  name="btn-pagerNext"
                  disabled={currentPage === getTotalPages() || getTotalPages() === 1}
                  onClick={() => onChangePage(currentPage + 1)}
                  className={`${buttonClass} hidden transition-all rounded-md md:flex items-center text-contenta-blue hover:text-white hover:bg-contenta-blue disabled:text-gray-800 disabled:border-gray-200 disabled:cursor-not-allowed disabled:bg-gray-200 border-gray-400`}>
                  {type === 'simple' ? <span className="pr-2">Next</span> : ''}
                  <span className={`${currentPage === getTotalPages() || getTotalPages() === 1 ? 'border-gray-400' : 'border-gray-500'}`}><BiChevronRight size={24} /></span>
               </button>
            </div>}
      </div>
   )
}

export default Pagination;